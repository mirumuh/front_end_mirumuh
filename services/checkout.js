import { api } from './api'

export default async function checkoutPayment(
  email,
  price_id,
  quantity,
  lang,
  recipe_name
) {
  const { data: response } = await api.post(`/checkout`, {
    customer_email: email,
    price_id: price_id,
    quantity: quantity,
    success_url: `http://localhost:3000/${lang}/sucesso?recipe_name=${encodeURIComponent(
      recipe_name
    )}&email=${email}`,
    cancel_url: `http://localhost:3000/${lang}/cancelado`,
  })

  return response || []
}
