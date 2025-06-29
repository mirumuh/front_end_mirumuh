import { api } from './api'

export default async function downloadReceita(fileIds) {
  // fileIds deve ser um array de strings
  const query = fileIds
    .map(id => `file_ids=${encodeURIComponent(id)}`)
    .join('&')

  const response = await api.get(`/download-recipe?${query}`, {
    responseType: 'blob',
  })

  return response.data // blob (ZIP)
}
