'use client'
import React, { useState } from 'react'

import Button from './Button'
import Loading from './Loading'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'
import ImageUploader from './ImageUploader'
import PdfUploader from './PdfUploader'

const ModalFormularioProduto = ({ closeModal }) => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagens, setImages] = useState(null)
  const [pdf, setPdf] = useState(null)
  const [tipoPintura, setTipoPintura] = useState('')
  const [idioma, setIdioma] = useState('')
  const [tipoProduto, setTipoProduto] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const saveProduct = async () => {
    /* setIsLoading(true)
    const response = await fetch('/api/save-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        confirmEmail,
      }),
    })
    const data = await response.json()
    setIsLoading(false)
    return data */
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
              <ImageUploader
                label={'Imagem do Produto'}
                onImageUpload={file => setImages(file)}
              />
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
