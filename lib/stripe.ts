import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})

export const SUBSCRIPTION_PLANS = {
  VTC_ZEN: {
    id: 'vtc-zen',
    name: 'VTC Zen',
    price: 4500, // 45€ in cents
    interval: 'month' as const,
    description: '1 service mensuel VTC Zen 45 minutes',
  },
  ENTRETIEN_MAISON: {
    id: 'entretien-maison',
    name: 'Entretien Maison',
    price: 5900, // 59€ in cents
    interval: 'month' as const,
    description: 'Intérieur Premium + 30 min canapé',
  },
  SIGNATURE: {
    id: 'signature',
    name: 'Signature',
    price: 9900, // 99€ in cents
    interval: 'month' as const,
    description: 'Intérieur Premium + contrôle trimestriel',
  },
} as const