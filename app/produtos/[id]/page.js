'use client'

import Produtos from '@/app/components/Produtos'
import { mockDataReceitas } from '@/app/services/receitasData'
import { useParams } from 'next/navigation'

const ProdutoPage = () => {
  const { id } = useParams()

  const produto = mockDataReceitas.find(
    receita => receita.idReceita === Number(id)
  )

  return (
    <Produtos
      nomeProduto={produto.nomeReceita}
      descricaoProduto={produto.descricaoReceita}
      precoProduto={produto.precoReceita}
      onClickBuy={() => alert('Comprar!')}
      arrayImagens={produto.arrayImagens}
    />
  )
}

export default ProdutoPage
