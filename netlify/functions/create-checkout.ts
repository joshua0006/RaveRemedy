import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

// CORS headers to allow cross-origin requests
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Log environment status for debugging
console.log('Netlify function loaded');
console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- STRIPE_SECRET_KEY present:', !!process.env.STRIPE_SECRET_KEY);
console.log('- STRIPE_SECRET_KEY first 4 chars:', process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 4) : 'not found');

// Initialize Stripe
let stripe: Stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }
  
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
  
  // Test the Stripe connection
  stripe.charges.list({ limit: 1 })
    .then(() => console.log('✓ Stripe connection successful'))
    .catch(err => console.error('× Stripe connection failed:', err.message));
} catch (err) {
  console.error('Stripe initialization error:', err);
}

const handler: Handler = async (event) => {
  console.log(`Received ${event.httpMethod} request`);
  
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log(`Method not allowed: ${event.httpMethod}`);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    console.log('Processing checkout request');
    
    // Verify Stripe is initialized
    if (!stripe) {
      throw new Error('Stripe is not initialized correctly. Check environment variables.');
    }
    
    // Parse the request body
    if (!event.body) {
      console.error('No request body provided');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }
    
    // Parse and log the request (careful not to log sensitive data in production)
    const requestBody = JSON.parse(event.body);
    console.log(`Cart contains ${requestBody.cart?.length || 0} items`);
    
    if (!requestBody.cart || !Array.isArray(requestBody.cart) || requestBody.cart.length === 0) {
      console.error('Invalid cart data');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing or invalid cart data' }),
      };
    }

    const { cart } = requestBody;

    // Validate and clean up image URLs
    const lineItems = cart.map(item => {
      // Ensure images are valid URLs or remove them
      let validatedImages: string[] = [];
      if (Array.isArray(item.images)) {
        validatedImages = item.images.filter(url => {
          if (!url) return false;
          try {
            // Attempt to create a URL object to validate it
            new URL(url);
            return true;
          } catch (e) {
            console.warn(`Invalid image URL: ${url}`);
            return false;
          }
        });
      }

      return {
        price_data: {
          currency: 'aud',
          product_data: {
            name: item.name,
            description: item.description || '',
            images: validatedImages, // Use our validated images array
            metadata: {
              flavor: item.flavor || ''
            }
          },
          unit_amount: item.unitPrice,
        },
        quantity: item.quantity || 1,
      };
    });

    console.log(`Created ${lineItems.length} line items for Stripe checkout`);

    // Calculate if free shipping applies
    const qualifiesForFreeShipping = cart.some(item => (item.quantity || 1) >= 2);
    
    // Ensure we have valid URLs for success and cancel
    // Default to the site root if URL environment variable is not set
    const domain = process.env.URL || 'https://raveremedy.netlify.app';
    
    // Make sure domain doesn't have trailing slashes
    const cleanDomain = domain.replace(/\/+$/, '');
    
    console.log(`Using domain for redirect URLs: ${cleanDomain}`);
    
    // Create checkout session
    console.log('Creating Stripe checkout session');
    const session = await stripe.checkout.sessions.create({
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
      success_url: `${cleanDomain}/success`,
      cancel_url: `${cleanDomain}/cancel`,
      metadata: {
        cartItems: JSON.stringify(cart.map(item => ({
          name: item.name,
          quantity: item.quantity || 1,
          flavor: item.flavor || '',
        }))),
      },
      allow_promotion_codes: true,
      phone_number_collection: {
        enabled: true,
      },
      customer_creation: 'always',
      billing_address_collection: 'required',
    });

    console.log(`Checkout session created: ${session.id}`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        id: session.id, 
        url: session.url 
      }),
    };
  } catch (error) {
    console.error('Checkout error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };