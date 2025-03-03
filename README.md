# RaveRemedy

Premium post-rave recovery supplements to help you bounce back faster.

## Development Setup

This project uses JavaScript/React for the frontend and Node.js/Express for the backend API.

### Prerequisites

- Node.js (v16+)

### Installation

1. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the Node.js server:
   ```
   npm run server
   ```

2. In a separate terminal, start the frontend development server:
   ```
   npm run dev
   ```

3. Visit http://localhost:5173 in your browser

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_STRIPE_PRICE_ID=your_stripe_price_id
VITE_STRIPE_PRODUCT_ID=your_stripe_product_id
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Deployment

The frontend is deployed on Netlify, while the Node.js backend needs to be deployed separately on a platform that supports Node.js (like Heroku or Render).

For production, make sure to update the API endpoints in the frontend code to point to your deployed backend.