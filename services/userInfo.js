import { api } from './api'

export default async function getUserProfile() {
  const token = sessionStorage.getItem('token')

  if (!token) {
    throw new Error('Token não encontrado')
  }

  try {
    const { data: response } = await api.post(
      `/profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const user = response?.user || {}

    return user
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    throw error
  }
}
