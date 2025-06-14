import { api } from '../api'

export default async function saveProducts(method, endpoint, data) {
  try {
    let response
    if (method === 'POST') {
      ;({ data: response } = await api.post(endpoint, data))
    } else if (method === 'PATCH') {
      ;({ data: response } = await api.patch(endpoint, data))
    } else {
      throw new Error('Método não suportado')
    }
    return response || []
  } catch (error) {
    console.error('Erro ao salvar produto:', error)
    throw error
  }
}
