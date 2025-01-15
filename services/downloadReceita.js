import { api } from './api'

export default async function downloadReceita() {
  const { data: response } = await api.get(`/download-recipe/:id`)

  return response || []
}
