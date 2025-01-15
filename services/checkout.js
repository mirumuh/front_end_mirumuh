import { api } from './api'

export default async function checkoutPayment(email, price_id, quantity) {
  const { data: response } = await api.post(`/checkout`, {
    customer_email: email,
    price_id: price_id,
    quantity: quantity,
    success_url: 'http://localhost:3000/sucesso',
    cancel_url: 'http://localhost:3000/cancelado',
  })

  return response || []
}
