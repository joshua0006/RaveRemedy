import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { accountId } = JSON.parse(event.body || '{}');
    
    if (!accountId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing account ID' }),
      };
    }

    // Create a login link for the connected account
    const loginLink = await stripe.accounts.createLoginLink(accountId);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: loginLink.url }),
    };
  } catch (error) {
    console.error('Login link error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create login link',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };