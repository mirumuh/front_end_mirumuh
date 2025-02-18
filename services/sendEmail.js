import { api } from './api'

export default async function sendEmail(data) {
  const { data: response } = await api.post(`/send-recipe`, data)

  return response || []
}
