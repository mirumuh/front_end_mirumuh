'use client'

import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import Produtos from '@/app/components/Produtos'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const ProdutoPage = () => {
  const searchParams = useSearchParams()
  const receitaParam = searchParams.get('produto')
  const produto = receitaParam ? JSON.parse(receitaParam) : null

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduto, setSelectedProduto] = useState(null)

  const onClickBuy = () => {
    setSelectedProduto(produto)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduto(null)
  }

  return (
    <>
      {!produto ? (
        <Loading />
      ) : (
        <Produtos
          nomeProduto={produto?.name}
          descricaoProduto={produto?.description}
          precoProduto={produto?.prices[0].amount}
          metadata={produto?.metadata}
          onClickBuy={onClickBuy}
          arrayImagens={produto?.images}
        />
      )}
      {isModalOpen && (
        <Modal produto={selectedProduto} closeModal={closeModal} />
      )}
    </>
  )
}

export default ProdutoPage
