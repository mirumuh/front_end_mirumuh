'use client'

import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import Produtos from '@/app/components/Produtos'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProdutoPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const receitaParam = searchParams.get('receita')
  const receita = receitaParam ? JSON.parse(receitaParam) : null

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduto, setSelectedProduto] = useState(null)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState(0)

  useEffect(() => {
    if (receita) {
      setProductName(receita.name)
      setProductDescription(receita.description)
      setProductPrice(receita.prices[0].amount)
    }
  }, [id, receita])

  const onClickBuy = () => {
    setSelectedProduto(receita)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduto(null)
  }

  return (
    <>
      {!receita ? (
        <Loading />
      ) : (
        <Produtos
          nomeProduto={productName}
          descricaoProduto={productDescription}
          precoProduto={productPrice}
          onClickBuy={onClickBuy}
          /* arrayImagens={produto?.arrayImagens} */
        />
      )}
      {isModalOpen && (
        <Modal produto={selectedProduto} closeModal={closeModal} />
      )}
    </>
  )
}

export default ProdutoPage
