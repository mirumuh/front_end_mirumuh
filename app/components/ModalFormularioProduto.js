'use client'
import React, { useEffect, useState } from 'react'

import Button from './Button'
import Loading from './Loading'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'
import PdfUploader from './PdfUploader'
import saveProducts from '@/services/Products/saveProducts'
import uploadPdfReceita from '@/services/uploadPdf'
import getProductsById from '@/services/Products/getProductsById'
import editProducts from '@/services/Products/editProducts'

const ModalFormularioProduto = ({ closeModal, idProduct, atualizarProdutos }) => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagens, setImagens] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [pdf, setPdf] = useState(null)
  const [tipoPintura, setTipoPintura] = useState('')
  const [idioma, setIdioma] = useState('')
  const [tipoProduto, setTipoProduto] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProdutos, setLoadingProdutos] = useState(false)

  const formatPrice = price => {
    if (!price) return 0
    const cleaned = price.replace(/[^\d,.-]/g, '').replace(',', '.')
    const numericPrice = parseFloat(cleaned)
    return isNaN(numericPrice) ? 0 : Math.round(numericPrice * 100)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files.slice(0, 8))
  }

  const handleImageUpload = async () => {
    const formData = new FormData()
    imageFiles.forEach((file) => {
      formData.append('images', file)
    })

    try {
      const res = await fetch('http://localhost:8080/upload-images', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (data.paths) {
        setImagens(data.paths)
      }
    } catch (error) {
      console.error('Erro ao enviar imagens:', error)
      alert('Erro ao enviar imagens')
    }
  }

  const saveProduct = async e => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const baseData = {
        active: true,
        name: titulo,
        description: descricao,
        price: formatPrice(preco),
        currency: 'brl',
        images: imagens,
        metadata: {},
      }

      if (tipoProduto === 'receita') {
        baseData.metadata = { tipo: tipoProduto, idioma }
      } else if (tipoProduto === 'amigurumi') {
        baseData.metadata = { tipo: tipoProduto, quantidade: 
        '1' }
      } else if (tipoProduto === 'pintura') {
        baseData.metadata = { tipo: tipoProduto, tipoPintura }
      }

      const response = await saveProducts(baseData)

      if (tipoProduto === 'receita' && pdf) {
        await uploadPdfReceita(pdf)
      }

      if (response) {
        alert('Produto salvo com sucesso!')
        atualizarProdutos && atualizarProdutos()
        closeModal()
      } else {
        alert('Erro ao salvar produto!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const editProduct = async e => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await editProducts(idProduct, {
        name: titulo,
        description: descricao,
        price: formatPrice(preco),
        currency: 'brl',
        images: imagens,
        metadata: {
          tipo: tipoProduto,
          idioma,
          tipoPintura,
          pdf,
        },
      })

      if (response) {
        alert('Produto editado com sucesso!')
        atualizarProdutos && atualizarProdutos()
        closeModal()
      } else {
        alert('Erro ao editar produto!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const receitaForm = (
    <>
      <SelectComponent
        value={idioma}
        setValue={setIdioma}
        options={[
          { value: 'ptbr', label: 'Português' },
          { value: 'us', label: 'Inglês' },
        ]}
        label={'Idioma'}
      />
      <PdfUploader label={'PDF do Produto'} onPdfUpload={file => setPdf(file)} />
    </>
  )

  const pinturaForm = (
    <SelectComponent
      value={tipoPintura}
      setValue={setTipoPintura}
      options={[
        { value: 'acrilica_guache', label: 'Pintura Acrílica/Guache' },
        { value: 'aquarela', label: 'Aquarela' },
        { value: 'print', label: 'Print' },
      ]}
      label={'Tipo de Pintura'}
    />
  )

  const fetchProdutoById = async id => {
    setLoadingProdutos(true)
    try {
      const response = await getProductsById(id)
      setTitulo(response.name)
      setDescricao(response.description)
      setPreco(
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
        }).format(response.prices[0].amount / 100)
      )
      setImagens(response.images)
      setTipoProduto(response.metadata?.tipo)
      setTipoPintura(response.metadata?.tipoPintura)
      setIdioma(response.metadata?.idioma)
      setPdf(response.metadata?.pdf)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoadingProdutos(false)
    }
  }

  useEffect(() => {
    if (idProduct) {
      fetchProdutoById(idProduct)
    }
  }, [idProduct])

  return (
    <>
      {isLoading || loadingProdutos ? (
        <Loading />
      ) : (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
          onClick={closeModal}
        >
          <div
            className='bg-white p-10 rounded-lg min-w-[300px] max-w-[600px] max-h-screenHeader overflow-y-auto w-1/2 flex flex-col gap-9'
            onClick={e => e.stopPropagation()}
          >
            <h1 className='text-2xl font-bold text-dark-purple'>
              {idProduct ? 'Editar Produto' : 'Adicionar Produto'}
            </h1>
            <form
              onSubmit={idProduct ? editProduct : saveProduct}
              className='flex flex-col gap-4 '
              onClick={e => e.stopPropagation()}
            >
              <InputComponent value={titulo} setValue={setTitulo} type='text' placeholder='Digite o título do produto' label='Título' />
              <InputComponent value={descricao} setValue={setDescricao} type='text' placeholder='Digite a descrição do produto' label='Descrição' />
              <InputComponent value={preco} setValue={setPreco} type='preco' placeholder='Digite o preço do produto' label='Preço' />
              <div>
                <label className='font-medium'>Imagens</label>
                <input type='file' multiple accept='image/*' onChange={handleFileSelect} className='mb-2' />
                <button type='button' onClick={handleImageUpload} className='bg-green-600 text-white px-3 py-1 rounded'>
                  Enviar imagens
                </button>
                {imagens && imagens.map((img, idx) => (
                  <div key={idx} className='text-sm text-gray-600 truncate'>{img}</div>
                ))}
              </div>
              <SelectComponent
                value={tipoProduto}
                setValue={setTipoProduto}
                options={[
                  { value: 'amigurumi', label: 'Amigurumi' },
                  { value: 'pintura', label: 'Pintura' },
                  { value: 'receita', label: 'Receita' },
                ]}
                label='Tipo de Produto'
              />
              {tipoProduto === 'receita' && receitaForm}
              {tipoProduto === 'pintura' && pinturaForm}
              <div className='flex justify-end'>
                <Button variant='brown' type='submit' label='Salvar' />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalFormularioProduto