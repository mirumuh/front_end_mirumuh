'use client'
import Receita from '../components/Receita'
import getProductsWithPrice from '@/services/getProducts'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

const Receitas = () => {
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProduto = async () => {
    setIsLoading(true)
    try {
      const response = await getProductsWithPrice()

      const activeProducts = response.filter(product => product.active)

      setAllProducts(activeProducts)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProduto()
  }, [])

  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      <div className='flex flex-col gap-5 px-5 py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14'>
        {isLoading ? (
          <Loading />
        ) : (
          allProducts.map((receita, index) => (
            <Receita key={index} receita={receita} />
          ))
        )}
      </div>
    </div>
  )
}

export default Receitas
