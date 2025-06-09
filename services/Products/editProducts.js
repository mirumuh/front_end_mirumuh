import { api } from '../api';

export default async function editProducts(id, dataToUpdate) {
  if (!id || !dataToUpdate) {
    throw new Error('ID do produto e dados para atualização são necessários.');
  }

  try {
    const { data: responseData } = await api.patch(`/product/${id}`, dataToUpdate);
    
    return responseData;

  } catch (error) {
    console.error('Erro no serviço editProducts:', error.response?.data || error.message);
    throw error;
  }
}