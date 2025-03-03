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

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        accountId: account.id,
        url: accountLink.url 
      }),
    };
  } catch (error) {
    console.error('Connect account error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create connect account',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };