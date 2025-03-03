import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

// Log environment variables (remove sensitive data in production)
console.log('Netlify function environment:');
console.log('- STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 
  `Found (first 4 chars: ${process.env.STRIPE_SECRET_KEY.substring(0, 4)})` : 'Not found');
console.log('- NODE_ENV:', process.env.NODE_ENV);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('ERROR: STRIPE_SECRET_KEY is missing in Netlify function');
}

// Initialize Stripe with explicit API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Test Stripe connection
try {
  console.log('Testing Stripe connection...');
  stripe.charges.list({ limit: 1 })
    .then(() => console.log('✅ Stripe connection successful!'))
    .catch(err => console.error('❌ Stripe connection failed:', err.message));
} catch (error) {
  console.error('Error testing Stripe connection:', error);
}

const handler: Handler = async (event) => {
  // CORS headers to allow requests from any origin
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
  
  // Handle OPTIONS requests (preflight CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    console.log('Netlify function: Received checkout request');
    
    // Parse the request body
    if (!event.body) {
      console.error('Netlify function: No request body received');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No request body' }),
      };
    }
    
    const { cart } = JSON.parse(event.body);
    
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      console.error('Netlify function: Invalid cart data');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing or invalid cart data' }),
      };
    }

    console.log(`Netlify function: Processing cart with ${cart.length} items`);

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

    // Calculate if free shipping applies (if any item has quantity >= 2)
    const qualifiesForFreeShipping = cart.some(item => (item.quantity || 1) >= 2);
    
    console.log('Netlify function: Creating Stripe checkout session');
    
    // Create a checkout session
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
      success_url: `${process.env.URL || 'http://localhost:5173'}/success`,
      cancel_url: `${process.env.URL || 'http://localhost:5173'}/cancel`,
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

    console.log('Netlify function: Checkout session created:', session.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (error) {
    console.error('Netlify function: Checkout error:', error);
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