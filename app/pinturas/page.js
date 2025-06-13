'use client'

import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import GridProducts from '../components/GridProducts'
import getProductsWithPrice from '@/services/Products/getProducts'
import ModalRedirecionamento from '../components/ModalRedirecionamento'

const PinturasPage = () => {
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchProduto = async () => {
    setIsLoading(true)
    try {
      const response = await getProductsWithPrice('pintura')
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

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        allProducts.filter(
          produto => produto.metadata.tipoPintura === selectedCategory
        )
      )
    } else {
      setFilteredProducts(allProducts)
    }
  }, [selectedCategory, allProducts])

  return (
    <div className='w-full h-screenHeader overflow-y-auto flex flex-col items-center '>
      {isLoading ? (
        <Loading />
      ) : allProducts.length === 0 ? (
        <div className='flex flex-col gap-6 justify-center items-center w-full py-14'>
          <div className='flex flex-row justify-center items-center w-fit bg-white rounded-3xl shadow-lg py-5 px-8 md:px-8'>
            <h2 className='text-[16px] font-semibold'>
              Não há pinturas disponíveis
            </h2>
          </div>
        </div>
      ) : (
        <div className='py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14 flex flex-col items-center justify-center w-full gap-10'>
          <div className='flex flex-col md:flex-row w-full items-center justify-center md:items-end md:justify-end md:pe-52 gap-4'>
            <button
              className='p-3 border-2 border-brown rounded-lg shadow-lg w-64 bg-brown text-white focus:outline-none'
              onClick={() => setIsModalOpen(true)}
            >
              Encomende sua pintura
            </button>

            <select
              className='p-3 border-2 border-brown rounded-lg shadow-lg w-64 appearance-none focus:outline-none'
              style={{
                backgroundImage: 'url("/icons/Vector.svg")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1rem',
              }}
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value=''>Todas as categorias</option>
              <option value='acrilica_guache'>
                Pintura Acrílica/Guache
              </option>
              <option value='aquarela'>Aquarela</option>
              <option value='print'>Print</option>
            </select>

            <ModalRedirecionamento
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>

          <div className='grid grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-5/6'>
            {filteredProducts &&
              filteredProducts.map((pintura, index) => (
                <GridProducts
                  key={index}
                  product={pintura}
                  pinturaAtiva={pintura.metadata.pinturaAtiva}
                  buttonLabel={
                    pintura.metadata.pinturaAtiva === 'true'
                      ? 'Comprar'
                      : 'Ver detalhes'
                  }
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default PinturasPage
