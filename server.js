import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

// Log environment variables (remove sensitive data in production)
console.log('Environment variables loaded:');
console.log('- STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Found (first 4 chars: ' + process.env.STRIPE_SECRET_KEY.substring(0, 4) + ')' : 'Not found');
console.log('- URL:', process.env.URL);

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('ERROR: STRIPE_SECRET_KEY is missing. Check your .env file.');
  process.exit(1);
}

// Explicitly set the API version and key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use a specific API version
  typescript: true,
});

// Initialize Express
const app = express();
const PORT = process.env.PORT || 4242;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Create a Stripe Connect account
app.post('/api/create-connect-account', async (req, res) => {
  try {
    // Create a connected account
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'AU',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: 'individual',
    });

    // Create an account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.URL || 'http://localhost:5173'}/connect/refresh`,
      return_url: `${process.env.URL || 'http://localhost:5173'}/connect/return`,
      type: 'account_onboarding',
    });

    res.json({ 
      accountId: account.id,
      url: accountLink.url 
    });
  } catch (error) {
    console.error('Connect account error:', error);
    res.status(500).json({ 
      error: 'Failed to create connect account',
      details: error.message 
    });
  }
});

// Get account status
app.get('/api/get-account-status', async (req, res) => {
  const { accountId } = req.query;
  
  if (!accountId) {
    return res.status(400).json({ error: 'Missing account ID' });
  }

  try {
    // Retrieve the account
    const account = await stripe.accounts.retrieve(accountId);
    
    // Check if the account is fully onboarded
    const isFullyOnboarded = 
      account.details_submitted && 
      account.charges_enabled && 
      account.payouts_enabled;
    
    res.json({
      accountId: account.id,
      detailsSubmitted: account.details_submitted,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      isFullyOnboarded,
    });
  } catch (error) {
    console.error('Account status error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve account status',
      details: error.message 
    });
  }
});

// Create a login link
app.post('/api/create-login-link', async (req, res) => {
  const { accountId } = req.body;
  
  if (!accountId) {
    return res.status(400).json({ error: 'Missing account ID' });
  }

  try {
    // Create a login link for the connected account
    const loginLink = await stripe.accounts.createLoginLink(accountId);
    res.json({ url: loginLink.url });
  } catch (error) {
    console.error('Login link error:', error);
    res.status(500).json({ 
      error: 'Failed to create login link',
      details: error.message 
    });
  }
});

// Create a checkout session
app.post('/api/create-checkout', async (req, res) => {
  try {
    console.log('Received checkout request');
    const { cart } = req.body;
    
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      console.error('Invalid cart data:', req.body);
      return res.status(400).json({ error: 'Missing or invalid cart data' });
    }

    console.log('Processing cart with items:', cart.length);
    
    // Get the connected account ID from local storage or a database
    // For this example, we'll use the account ID from the request if provided
    const connectedAccountId = req.body.connectedAccountId;

    // Create line items from cart
    const lineItems = cart.map(item => ({
      price_data: {
        currency: 'aud',
        product_data: {
          name: item.name,
          description: item.description || '',
          images: Array.isArray(item.images) ? item.images : [],
          metadata: {
            flavor: item.flavor || ''
          }
        },
        unit_amount: item.unitPrice,
      },
      quantity: item.quantity || 1,
    }));

    console.log(`Created ${lineItems.length} line items for Stripe`);

    // Calculate if free shipping applies (if any item has quantity >= 2)
    const qualifiesForFreeShipping = cart.some(item => (item.quantity || 1) >= 2);
    
    // Create checkout session options
    const sessionOptions = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: qualifiesForFreeShipping ? 0 : 995, // Free shipping for qualifying orders, otherwise $9.95
              currency: 'aud',
            },
            display_name: qualifiesForFreeShipping ? 'Free Express Shipping' : 'Express Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
      ],
      success_url: `${process.env.URL || 'http://localhost:5173'}/success`,
      cancel_url: `${process.env.URL || 'http://localhost:5173'}/cancel`,
      metadata: {
        cart_items: JSON.stringify(cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          flavor: item.flavor || '',
        }))),
      },
      allow_promotion_codes: true,
      phone_number_collection: {
        enabled: true,
      },
      customer_creation: 'always',
      billing_address_collection: 'required',
    };

    // If we have a connected account, add the transfer_data
    if (connectedAccountId) {
      // Calculate application fee (e.g., 10% of the total)
      const applicationFeePercent = 10;
      
      // Add transfer data to the session options
      sessionOptions.payment_intent_data = {
        transfer_data: {
          destination: connectedAccountId,
        },
        application_fee_amount: Math.round(cart.reduce((total, item) => 
          total + (item.unitPrice * (item.quantity || 1) * applicationFeePercent / 100), 0)),
      };
    }
    
    console.log('Creating Stripe checkout session...');
    
    // Create a checkout session
    const session = await stripe.checkout.sessions.create(sessionOptions);
    
    console.log('Checkout session created:', session.id);

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
});

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});