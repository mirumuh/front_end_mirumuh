import { api } from './api'

export default async function getProducts() {
  const { data: response } = await api.get(`products`)

  return response || []
}
