import { api } from '../api'

export default async function softDeleteProduct(id) {
  try {
    const { data: response } = await api.delete(`/product/${id}`, {
      active: false,
    })

    return response || []
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    throw error
  }
}
