import axios from 'axios'

const configValue = process.env.NEXT_STRIPE_API_KEY_SECRET
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const testeUrl = process.env.NEXT_PUBLIC_TESTE_URL

export const api = axios.create({
  headers: {
    Authorization: `Bearer ${configValue}`,
    'Content-Type': 'application/json',
  },
  baseURL: window.location.origin.includes('localhost')
    ? testeUrl
    : baseUrl,
})

api.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token') // Pegue o token do sessionStorage ou use um contexto

    // Verifica se o endpoint NÃO é login ou create-user antes de adicionar o token
    if (
      !config.url.includes('/login') &&
      !config.url.includes('/create-user') &&
      token
    ) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
