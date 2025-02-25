import { api } from '../api'

export default async function getProductsWithPrice() {
  const { data: response } = await api.get(`/available-products`)

  return response || []
}
