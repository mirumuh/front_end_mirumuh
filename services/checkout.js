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
    success_url: `${
      window.location.origin
    }/${lang}/sucesso?recipe_name=${encodeURIComponent(
      recipe_name
    )}&email=${email}`,
    cancel_url: `${window.location.origin}/${lang}/cancelado`,
  })

  return response || []
}
