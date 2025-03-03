# Deploying to Netlify

This document explains how to properly deploy this Stripe-integrated application to Netlify.

## Preparation

1. Make sure you have a [Netlify account](https://app.netlify.com/signup).
2. Make sure you have a [Stripe account](https://dashboard.stripe.com/register).

## Environment Variables

You need to set up the following environment variables in Netlify:

1. `STRIPE_SECRET_KEY` - Your Stripe secret key
2. `VITE_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
3. `URL` - Your Netlify site URL (e.g., https://your-site.netlify.app)

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

1. Check Netlify function logs in the Netlify dashboard.
2. Verify environment variables are correctly set.
3. Make sure the Stripe API keys are valid.
4. Check browser console for error messages.

## Local Development vs Production

The application is configured to work in both environments:

- **Local development**: Uses the redirects in netlify.toml to route API requests.
- **Production**: Uses Netlify Functions to handle API requests.

The checkout process will automatically use the appropriate endpoint based on the environment. 