import { api } from './api'

export default async function getUserProfile() {
  try {
    const { data: response } = await api.post(`/profile`, {})

    const user = response || {}

    return user
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    throw error
  }
}
