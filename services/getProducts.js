import { api } from './api'

export default async function getProductsWithPrice(category = '') {
  const url = category
    ? `/available-products?value=${category}`
    : '/available-products' 

  try {
    const { data: response } = await api.get(url)
    return response || [] 
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    throw error 
  }
}
