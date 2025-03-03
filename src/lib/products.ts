/**
 * Product Configuration
 * 
 * Defines all available products with their Stripe price IDs and metadata.
 */

export const PRODUCTS = {
  'Lemon Squash': {
    id: 'lemon-squash',
    name: 'RaveRemedy Recovery Pack',
    description: 'Premium Post-Rave Recovery Formula',
    images: ['/01.png'],
    unitPrice: 4999, // $49.99 in cents
    priceId: 'price_1Qru79G1x0pR1xxfBdG00Sh0b', // Stripe Price ID
    metadata: {
      flavor: 'Lemon Squash',
      servings: 20,
      weight: '100g'
    }
  },
  'Orange Crush': {
    id: 'orange-crush',
    name: 'RaveRemedy Recovery Pack',
    description: 'Premium Post-Rave Recovery Formula',
    images: ['/01.png'],
    unitPrice: 4999,
    priceId: 'price_1Qru79G1x0pR1xxfhAvYaHwe', // Stripe Price ID
    metadata: {
      flavor: 'Orange Crush',
      servings: 20,
      weight: '100g'
    }
  },
  'Pineapple Punch': {
    id: 'pineapple-punch',
    name: 'RaveRemedy Recovery Pack',
    description: 'Premium Post-Rave Recovery Formula',
    images: ['/01.png'],
    unitPrice: 4999,
    priceId: 'price_1Qru79G1x0pR1xxftq0HFfDr', // Stripe Price ID
    metadata: {
      flavor: 'Pineapple Punch',
      servings: 20,
      weight: '100g'
    }
  }
} as const;