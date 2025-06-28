'use client'
import Receita from '../components/Receita'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import getProductsWithPrice from '@/services/Products/getProducts'

const Receitas = () => {
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProduto = async () => {
    setIsLoading(true)
    try {
      const response = await getProductsWithPrice('receita')
      const filteredProducts = response.filter(product => product.active)
      setAllProducts(filteredProducts)
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
        ) : allProducts.length === 0 ? (
          <div className='flex flex-col gap-6 justify-center items-center w-full'>
            <div className='flex flex-row justify-center items-center w-fit bg-white rounded-3xl shadow-lg py-5 px-6 md:px-8'>
              <h2 className='text-[16px] font-semibold'>
                Não há receitas disponíveis
              </h2>
            </div>
          </div>
        ) : (
          <>
            {allProducts.map((receita, index) => (
              <Receita key={index} receita={receita} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Receitas
