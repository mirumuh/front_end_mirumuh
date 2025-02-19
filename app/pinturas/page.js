'use client'

import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import GridProducts from '../components/GridProducts'
import getProductsWithPrice from '@/services/getProducts'

const PinturasPage = () => {
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProduto = async () => {
    setIsLoading(true)
    try {
      const response = await getProductsWithPrice()

      setAllProducts(response)
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
    <div className='w-full h-screenHeader overflow-y-auto flex flex-col items-center '>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14 flex flex-col items-center justify-center w-full gap-10'>
          <div className='flex flex-col items-center justify-center w-full'>
            filtro aqui
          </div>
          <div className='grid grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 '>
            {allProducts.map((pintura, index) => (
              <GridProducts key={index} product={pintura} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default PinturasPage
