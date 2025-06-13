import { api } from '../api'

export default async function saveProducts(data) {
  try {
    const { data: response } = await api.post(`/product`, data)

    return response || []
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    throw error
  }
}
