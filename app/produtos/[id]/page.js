'use client'

import Modal from '@/app/components/Modal'
import Produtos from '@/app/components/Produtos'
import getProductsWithPrice from '@/services/get-products'
import { mockDataReceitas } from '@/services/receitasData'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProdutoPage = () => {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduto, setSelectedProduto] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState(0)

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

  useEffect(() => {
    const produto = allProducts.find(receita => receita.id === id)
    if (produto) {
      setProductName(produto.name)
      setProductDescription(produto.description)
      setProductPrice(produto.prices[0].amount)
    }
  }, [allProducts, id])

  const onClickBuy = () => {
    const produto = allProducts.find(receita => receita.id === id)
    setSelectedProduto(produto)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduto(null)
  }

  return (
    <>
      <Produtos
        nomeProduto={productName}
        descricaoProduto={productDescription}
        precoProduto={productPrice}
        onClickBuy={onClickBuy}
        /* arrayImagens={produto?.arrayImagens} */
      />
      {isModalOpen && (
        <Modal produto={selectedProduto} closeModal={closeModal} />
      )}
    </>
  )
}

export default ProdutoPage
