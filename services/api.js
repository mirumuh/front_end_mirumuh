import axios from 'axios'

const configValue = process.env.NEXT_STRIPE_API_KEY_SECRET

console.log(configValue)

export const api = axios.create({
  headers: {
    Authorization: `Bearer ${configValue}`,
    'Content-Type': 'application/json',
  },
  baseURL: 'http://localhost:8080',
})
