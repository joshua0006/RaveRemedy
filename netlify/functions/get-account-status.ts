import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Get the account ID from the query string
  const accountId = event.queryStringParameters?.accountId;
  
  if (!accountId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing account ID' }),
    };
  }

  try {
    // Retrieve the account
    const account = await stripe.accounts.retrieve(accountId);
    
    // Check if the account is fully onboarded
    const isFullyOnboarded = 
      account.details_submitted && 
      account.charges_enabled && 
      account.payouts_enabled;
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        accountId: account.id,
        detailsSubmitted: account.details_submitted,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        isFullyOnboarded,
      }),
    };
  } catch (error) {
    console.error('Account status error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to retrieve account status',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

export { handler };