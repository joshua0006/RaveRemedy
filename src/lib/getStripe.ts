import { loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<any> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;