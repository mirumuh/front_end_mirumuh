'use client'
import React, { useState } from 'react'

import Button from './Button'
import Loading from './Loading'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'
import PdfUploader from './PdfUploader'
import saveProducts from '@/services/Products/saveProducts'
import uploadPdfReceita from '@/services/uploadPdf'
import GoogleDrivePicker from './ImageUploader'
import Image from 'next/image'

const ModalFormularioProduto = ({ closeModal }) => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagens, setImagens] = useState()
  const [pdf, setPdf] = useState(null)
  const [tipoPintura, setTipoPintura] = useState('')
  const [idioma, setIdioma] = useState('')
  const [tipoProduto, setTipoProduto] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const formatPrice = price => {
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''))
    return isNaN(numericPrice) ? 0 : Math.round(numericPrice * 100)
  }

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
        images: imagens,
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
        images: imagens,
        metadata: {
          tipo: tipoProduto,
        },
      }
      const pinturaData = {
        active: true,
        name: titulo,
        description: descricao,
        price: formatPrice(preco),
        currency: 'brl',
        images: imagens,
        metadata: {
          tipo: tipoProduto,
          tipoPintura: tipoPintura,
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

      console.log(data)

      const response = await saveProducts(data)

      if (tipoProduto === 'receita' && pdf) {
        await uploadPdfReceita(pdf)
      }

      if (response) {
        alert('Produto salvo com sucesso!')
        console.log(response)
        closeModal()
      } else {
        alert('Erro ao salvar produto!')
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

  return (
    <>
      {isLoading ? (
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
              Adicionar Produto
            </h1>
            <form
              onSubmit={saveProduct}
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
              <GoogleDrivePicker setImages={setImagens} />
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
