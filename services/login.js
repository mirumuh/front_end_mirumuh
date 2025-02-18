import { api } from './api'

export default async function login(email, password) {
  const { data: response } = await api.post(`/login`, {
    email: email,
    password: password,
  })

  return response || []
}

export async function register({ email, password, name, birthdate }) {
  const { data: response } = await api.post(`/create-user`, {
    name: name,
    email: email,
    password: password,
    birthdate: birthdate,
  })

  return response || []
}
