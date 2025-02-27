import { api } from './api'

export default async function uploadPdfReceita(file) {
  try {
    const formData = new FormData()
    formData.append('file', file) // Backend pode esperar outro nome, verifique

    const { data: response } = await api.post(`/upload-recipe`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response || []
  } catch (error) {
    console.error('Erro ao fazer upload da receita:', error)
    throw error
  }
}
