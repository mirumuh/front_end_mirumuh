import { api } from './api'

export default async function uploadPdfReceita(file) {
  try {
    const { data: response } = await api.post(`/upload-recipe`, file)

    return response || []
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    throw error
  }
}
