import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const handler: Handler = async () => {
  try {
    // Collect environment information (safely)
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      URL: process.env.URL || 'not set',
      STRIPE_KEY_PRESENT: process.env.STRIPE_SECRET_KEY ? 'Yes' : 'No',
      STRIPE_KEY_STARTS_WITH: process.env.STRIPE_SECRET_KEY 
        ? `${process.env.STRIPE_SECRET_KEY.substring(0, 7)}...` 
        : 'N/A',
      CONTEXT: process.env.CONTEXT || 'not set',
      NETLIFY: process.env.NETLIFY || 'not set',
      NETLIFY_DEV: process.env.NETLIFY_DEV || 'not set'
    };

    // Test Stripe connection
    let stripeStatus = 'Not tested';
    if (process.env.STRIPE_SECRET_KEY) {
      try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2023-10-16'
        });
        
        // Try a simple operation
        await stripe.charges.list({ limit: 1 });
        stripeStatus = 'Connected successfully';
      } catch (error) {
        stripeStatus = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    } else {
      stripeStatus = 'No Stripe key available to test';
    }

    // Return debugging information
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Environment and Stripe test',
        timestamp: new Date().toISOString(),
        environment: envInfo,
        stripeStatus
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to test environment',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export { handler }; 