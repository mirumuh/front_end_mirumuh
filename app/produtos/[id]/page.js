'use client'

import Modal from '@/app/components/Modal'
import Produtos from '@/app/components/Produtos'
import { mockDataReceitas } from '@/services/receitasData'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProdutoPage = () => {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduto, setSelectedProduto] = useState(null)

  /*   const fetchProduto = async () => {
    try {
      const response = await fetch('http://localhost:8080/products')
      const data = await response.json()
      console.log('Produtos:', data)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    }
  }

  useEffect(() => {
    fetchProduto()
  }, [])
 */
  const produto = mockDataReceitas.find(
    receita => receita.idReceita === Number(id)
  )

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
      <Produtos
        nomeProduto={produto.nomeReceita}
        descricaoProduto={produto.descricaoReceita}
        precoProduto={produto.precoReceita}
        onClickBuy={onClickBuy}
        arrayImagens={produto.arrayImagens}
      />
      {isModalOpen && (
        <Modal produto={selectedProduto} closeModal={closeModal} />
      )}
    </>
  )
}

export default ProdutoPage
