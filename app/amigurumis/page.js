'use client'

import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import GridProducts from '../components/GridProducts'
import getProductsWithPrice from '@/services/Products/getProducts'

const AmigurumisPage = () => {
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProduto = async () => {
    setIsLoading(true)
    try {
      const response = await getProductsWithPrice('amigurumi')
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
    <div className='w-full h-screenHeader overflow-y-auto flex flex-col items-center '>
      {isLoading ? (
        <Loading />
      ) : allProducts.length === 0 ? (
        <div className=' flex flex-col gap-6 justify-center items-center py-10  w-full'>
          <div className='flex flex-row justify-center items-center w-fit bg-white rounded-3xl shadow-lg py-5 px-6 md:px-8'>
            <h2 className='text-[16px] font-semibold'>
              Não há amigurumis disponíveis
            </h2>
          </div>
        </div>
      ) : (
        <div className='py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14 flex flex-col items-center justify-center w-full gap-10'>
          <div className='grid grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-5/6'>
            {allProducts.map((amigurimi, index) => (
              <GridProducts
                key={index}
                product={amigurimi}
                buttonColor={
                  Number(amigurimi.metadata?.quantidade) > 0
                    ? 'green'
                    : 'blue'
                }
                buttonLabel={
                  Number(amigurimi.metadata?.quantidade) > 0
                    ? 'Disponível'
                    : 'Sob Encomenda'
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default AmigurumisPage
