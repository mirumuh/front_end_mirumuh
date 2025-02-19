import axios from 'axios'

const configValue = process.env.NEXT_STRIPE_API_KEY_SECRET

export const api = axios.create({
  headers: {
    Authorization: `Bearer ${configValue}`,
    'Content-Type': 'application/json',
  },
  baseURL: 'https://159.89.52.201/',
})
