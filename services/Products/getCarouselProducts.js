import { api } from '../api'

export default async function getCarousel() {
  try {
    const { data: response } = await api.get('/available-products')
    return response || []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    throw error
  }
}
