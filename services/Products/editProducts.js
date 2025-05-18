import { api } from '../api'

export default async function editProducts(id, data) {
  try {
    const { data: response } = await api.patch(`/product/${id}`, data)

    return response || []
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    throw error
  }
}
