import axios from 'axios'

const configValue = process.env.NEXT_STRIPE_API_KEY_SECRET
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const testeUrl = process.env.NEXT_PUBLIC_TESTE_URL

export const api = axios.create({
  headers: {
    Authorization: `Bearer ${configValue}`,
    'Content-Type': 'application/json',
  },
  baseURL: baseUrl,
})
