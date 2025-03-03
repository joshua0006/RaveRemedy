# Deploying to Netlify

This document explains how to properly deploy this Stripe-integrated application to Netlify.

## Preparation

1. Make sure you have a [Netlify account](https://app.netlify.com/signup).
2. Make sure you have a [Stripe account](https://dashboard.stripe.com/register).

## Environment Variables

You need to set up the following environment variables in Netlify:

1. `STRIPE_SECRET_KEY` - Your Stripe secret key
2. `VITE_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
3. `URL` - Your Netlify site URL (e.g., https://raveremedy.netlify.app)

### Important Note About Environment Variables

The Stripe secret key must be properly set in Netlify for the functions to work correctly. Follow these steps:

1. Go to your Netlify site dashboard
2. Click on "Site settings" → "Environment variables"
3. Add each variable exactly as named above
4. Make sure there are no spaces or special characters in the values
5. After adding the variables, go to "Functions" in the site menu and click "Clear function cache"
6. Then redeploy your site by going to "Deploys" and clicking "Trigger deploy" → "Clear cache and deploy site"

## Deployment Steps

### Option 1: Deploy from the Netlify UI

1. Log in to your [Netlify dashboard](https://app.netlify.com/).
2. Click the "New site from Git" button.
3. Connect your Git provider (GitHub, GitLab, or Bitbucket).
4. Select your repository.
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Show advanced" and add the environment variables listed above.
7. Click "Deploy site".

### Option 2: Deploy using Netlify CLI

1. Install the Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

2. Log in to Netlify:
   ```
   netlify login
   ```

3. Initialize your site:
   ```
   netlify init
   ```

4. Set up environment variables:
   ```
   netlify env:set STRIPE_SECRET_KEY sk_test_your_secret_key
   netlify env:set VITE_STRIPE_PUBLISHABLE_KEY pk_test_your_publishable_key
   netlify env:set URL https://your-site.netlify.app
   ```

5. Deploy your site:
   ```
   netlify deploy --prod
   ```

## Testing the Deployment

After deployment, test the checkout process using Stripe test cards:

- **Success card**: `4242 4242 4242 4242`
- **Decline card**: `4000 0000 0000 0002`

For any date in the future and any 3-digit CVC.

## Troubleshooting

If you encounter issues:

1. **Check Netlify Function Logs**:
   - Go to your Netlify dashboard → Functions
   - Find the function that's failing and check the logs
   - Look for error messages related to Stripe or environment variables

2. **Verify Environment Variables**:
   - Make sure they're set correctly without extra spaces
   - The STRIPE_SECRET_KEY should begin with "sk_test_" or "sk_live_"
   - If you update variables, redeploy your site and clear the function cache

3. **Check Browser Console**:
   - Open developer tools in your browser (F12)
   - Look for network errors or JavaScript errors
   - Verify that requests to /.netlify/functions/create-checkout are being made

4. **Test Locally First**:
   - Before deploying, test with `netlify dev` locally
   - This simulates the Netlify environment on your machine

5. **Try Direct Function URL**:
   - Test accessing https://your-site.netlify.app/.netlify/functions/create-checkout directly
   - If you get a proper JSON response (even an error), the function is deployed

## Local Development vs Production

The application is configured to work in both environments:

- **Local development**: Uses the API path routed to your local server or Netlify Dev
- **Production**: Uses Netlify Functions directly accessed via /.netlify/functions/ path

The checkout process will automatically use the appropriate endpoint based on the hostname. 