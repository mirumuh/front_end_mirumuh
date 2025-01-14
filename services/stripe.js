import { loadStripe } from '@stripe/stripe-js'

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  }
  return stripePromise
}

export default getStripe
