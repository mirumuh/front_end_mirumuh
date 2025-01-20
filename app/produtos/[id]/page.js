'use client'

import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import Produtos from '@/app/components/Produtos'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const ProdutoPage = () => {
  const searchParams = useSearchParams()
  const receitaParam = searchParams.get('receita')
  const receita = receitaParam ? JSON.parse(receitaParam) : null

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduto, setSelectedProduto] = useState(null)

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
          nomeProduto={receita?.name}
          descricaoProduto={receita?.description}
          precoProduto={receita?.prices[0].amount}
          onClickBuy={onClickBuy}
          arrayImagens={receita?.images}
        />
      )}
      {isModalOpen && (
        <Modal produto={selectedProduto} closeModal={closeModal} />
      )}
    </>
  )
}

export default ProdutoPage
