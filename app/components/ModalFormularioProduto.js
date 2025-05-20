'use client'
import React, { useEffect, useState } from 'react'

import Button from './Button'
import Loading from './Loading'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'
import PdfUploader from './PdfUploader'
import saveProducts from '@/services/Products/saveProducts'
import uploadPdfReceita from '@/services/uploadPdf'
import GoogleDrivePicker from './ImageUploader'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import getProductsById from '@/services/Products/getProductsById'
import editProducts from '@/services/Products/editProducts'

const ModalFormularioProduto = ({
  closeModal,
  idProduct,
  atualizarProdutos,
}) => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagens, setImagens] = useState()
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
  console.log(idProduct)

  const saveProduct = async e => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const receitaData = {
        active: true,
        name: titulo,
        description: descricao,
        price: formatPrice(preco),
        currency: 'brl',
        images: imagens ?? [
          'https://res.cloudinary.com/djtmwpq1g/image/upload/v1746314544/gsxqbrvxrr89fdopqzth.png',
        ],
        metadata: {
          tipo: tipoProduto,
          idioma: idioma,
        },
      }

      const amigurumiData = {
        active: true,
        name: titulo,
        description: descricao,
        price: formatPrice(preco),
        currency: 'brl',
        images: imagens ?? [
          'https://res.cloudinary.com/djtmwpq1g/image/upload/v1746314544/gsxqbrvxrr89fdopqzth.png',
        ],
        metadata: {
          tipo: tipoProduto,
          quantidade: 1,
        },
      }

      const pinturaData = {
        active: true,
        name: titulo,
        description: descricao,
        price: formatPrice(preco),
        currency: 'brl',
        images: imagens ?? [
          'https://res.cloudinary.com/djtmwpq1g/image/upload/v1746314544/gsxqbrvxrr89fdopqzth.png',
        ],
        metadata: {
          tipo: tipoProduto,
          tipoPintura: tipoPintura,
          pinturaAtiva: 'true',
        },
      }

      let data = {}

      if (tipoProduto === 'receita') {
        data = receitaData
      } else if (tipoProduto === 'amigurumi') {
        data = amigurumiData
      } else if (tipoProduto === 'pintura') {
        data = pinturaData
      }

      const response = await saveProducts(data)

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
        images: imagens ?? [
          'https://res.cloudinary.com/djtmwpq1g/image/upload/v1746314544/gsxqbrvxrr89fdopqzth.png',
        ],
        metadata: {
          tipo: tipoProduto,
          idioma: idioma,
          tipoPintura: tipoPintura,
          pdf: pdf,
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
      <PdfUploader
        label={'PDF do Produto'}
        onPdfUpload={file => setPdf(file)}
      />
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

  const handleUpload = result => {
    if (result?.info?.secure_url) {
      setImagens(prev => {
        // impede mais de 8 imagens
        if (prev.length >= 8) return prev
        return [...prev, result.info.secure_url]
      })
    }
  }

  const fetchProdutoById = async id => {
    setLoadingProdutos(true)
    try {
      const response = await getProductsById(id)
      console.log(response)

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
              <InputComponent
                value={titulo}
                setValue={setTitulo}
                type={'text'}
                placeholder={'Digite o título do produto'}
                label={'Título'}
              />
              <InputComponent
                value={descricao}
                setValue={setDescricao}
                type={'text'}
                placeholder={'Digite a descrição do produto'}
                label={'Descrição'}
              />
              <InputComponent
                value={preco}
                setValue={setPreco}
                type={'preco'}
                placeholder={'Digite o preço do produto'}
                label={'Preço'}
              />
              {/* <ImageUploader
                label={'Imagem do Produto'}
                onImageUpload={file => setImages(file)}
              /> */}{' '}
              {/* <GoogleDrivePicker setImages={setImagens} /> */}
              <CldUploadWidget
                signatureEndpoint='/services/uploadImages'
                options={{
                  maxFiles: 8,
                  multiple: true,
                  sources: ['local', 'camera', 'url'],
                  resourceType: 'image',
                }}
                uploadPreset='ml_default'
              >
                {({ open }) => {
                  return (
                    <button
                      onClick={() => {
                        const result = open()
                        if (result?.length) {
                          const urls = result
                            .map(r => r?.secure_url)
                            .filter(Boolean)
                            .slice(0, 8 - imageUrls.length)

                          setImagens(prev => [...prev, ...urls])
                        }
                      }}
                      type='button'
                      className='bg-blue-500 px-4 py-2 rounded'
                    >
                      Selecionar Imagens
                    </button>
                  )
                }}
              </CldUploadWidget>
              {imagens &&
                imagens?.map((img, index) => (
                  <span key={index}>{img}</span>
                ))}
              <SelectComponent
                value={tipoProduto}
                setValue={setTipoProduto}
                options={[
                  { value: 'amigurumi', label: 'Amigurumi' },
                  { value: 'pintura', label: 'Pintura' },
                  { value: 'receita', label: 'Receita' },
                ]}
                label={'Tipo de Produto'}
              />
              {tipoProduto === 'receita' && receitaForm}
              {tipoProduto === 'pintura' && pinturaForm}
              <div className='flex justify-end'>
                <Button
                  variant={'brown'}
                  type={'submit'}
                  label={'Salvar'}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalFormularioProduto
