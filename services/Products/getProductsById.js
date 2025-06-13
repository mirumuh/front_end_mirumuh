import { api } from '../api'

export default async function getProductsById(id) {
  try {
    const { data: response } = await api.get(`/product/${id}`)
    return response || []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    throw error
  }
}
