import { api } from './api'

export default async function uploadPdfReceita(files) {
  try {
    const formData = new FormData()

    files.forEach(file => {
      formData.append('files', file)
    })

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
