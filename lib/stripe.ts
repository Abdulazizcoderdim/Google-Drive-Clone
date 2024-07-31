import Stripe from 'stripe'

const stripeClient = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
})

export default stripeClient