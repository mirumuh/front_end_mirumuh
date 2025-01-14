'use client'
import Receita from '../components/Receita'
import getProductsWithPrice from '@/services/get-products'
import { useEffect, useState } from 'react'

const Receitas = () => {
  const [allProducts, setAllProducts] = useState([])
  const fetchProduto = async () => {
    try {
      const response = await getProductsWithPrice()

      setAllProducts(response)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    }
  }

  useEffect(() => {
    fetchProduto()
  }, [])

  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      <div className='flex flex-col gap-5 px-5 py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14'>
        {allProducts.map((index, receita) => (
          <Receita
            key={index}
            idReceita={receita?.id}
            nomeReceita={receita?.name}
            descricaoReceita={receita?.description}
          />
        ))}
      </div>
    </div>
  )
}

export default Receitas
