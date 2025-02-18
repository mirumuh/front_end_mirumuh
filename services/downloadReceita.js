import { api } from './api'

export default async function downloadReceita({ id }) {
  const response = await api.get(`/download-recipe/${id}`, {
    responseType: 'blob',
  })

  return response.data
}
