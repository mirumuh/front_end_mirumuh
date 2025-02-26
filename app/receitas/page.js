'use client'
import Receita from '../components/Receita'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import getProductsWithPrice from '@/services/Products/getProducts'

const Receitas = () => {
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  const fetchProduto = async (category = '') => {
    setIsLoading(true)
    try {
      const response = await getProductsWithPrice(category)
      const filteredProducts = response
        .filter(
          product =>
            product.metadata &&
            product.metadata.tipo === 'receita' &&
            product.active
        )
        .map(product => ({
          ...product,
          category: product.category || '',
        }))

      setAllProducts(filteredProducts)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProduto(selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        allProducts.filter(
          produto =>
            produto.category?.trim().toLowerCase() ===
            selectedCategory.toLowerCase()
        )
      )
    } else {
      setFilteredProducts(allProducts)
    }
  }, [selectedCategory, allProducts])

  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      <div className='flex flex-col gap-5 px-5 py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14'>
        {isLoading ? (
          <Loading />
        ) : allProducts.length === 0 ? (
          <div className=' flex flex-col gap-6 justify-center items-center w-full'>
            <div className='flex flex-row justify-center items-center w-fit bg-white rounded-3xl shadow-lg py-5 px-6 md:px-8'>
              <h2 className='text-[16px] font-semibold'>
                Não há receitas disponíveis
              </h2>
            </div>
          </div>
        ) : (
          <>
            <div className='w-full flex justify-end md:pe-4'>
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
                <option value='ptbr'>PTBR</option>
                <option value='us'>US</option>
              </select>
            </div>

            {filteredProducts.map((receita, index) => (
              <Receita key={index} receita={receita} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Receitas
