'use client'
import React, { useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression'

import Button from './Button'
import Loading from './Loading'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'
import PdfUploader from './PdfUploader'

import getProductsById from '@/services/Products/getProductsById'

const ModalFormularioProduto = ({
  closeModal,
  idProduct,
  atualizarProdutos,
}) => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [pdf, setPdf] = useState(null)
  const [tipoPintura, setTipoPintura] = useState('')
  const [idioma, setIdioma] = useState('')
  const [tipoProduto, setTipoProduto] = useState('')

  const [arquivosParaUpload, setArquivosParaUpload] = useState([])
  const [imagensExistentes, setImagensExistentes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProdutos, setLoadingProdutos] = useState(false)

  const formatPrice = price => {
    if (!price) return 0
    const cleaned = String(price)
      .replace(/[^\d,.-]/g, '')
      .replace(',', '.')
    const numericPrice = parseFloat(cleaned)
    return isNaN(numericPrice) ? 0 : Math.round(numericPrice * 100)
  }

  const handleFileSelection = event => {
    const files = Array.from(event.target.files)
    if (files.length > 8) {
      alert('Você pode selecionar no máximo 8 imagens.')
      setArquivosParaUpload([])
      return
    }
    setArquivosParaUpload(files)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()

      if (arquivosParaUpload.length > 0) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/webp',
        }
        const compressedFiles = await Promise.all(
          arquivosParaUpload.map(file => imageCompression(file, options))
        )
        compressedFiles.forEach(webpFile => {
          formData.append('imagens', webpFile, `imagem_${Date.now()}.webp`)
        })
      }

      formData.append('name', titulo)
      formData.append('description', descricao)
      formData.append('tipo', tipoProduto)
      formData.append('price', formatPrice(preco))
      if (tipoProduto === 'receita') formData.append('idioma', idioma)
      if (tipoProduto === 'pintura')
        formData.append('tipoPintura', tipoPintura)

      const isEditing = !!idProduct
      const method = isEditing ? 'PATCH' : 'POST'
      const endpoint = isEditing
        ? `http://localhost:8080/product/${idProduct}`
        : 'http://localhost:8080/product'

      const response = await fetch(endpoint, {
        method: method,
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        alert(
          result.message ||
            `Produto ${isEditing ? 'editado' : 'salvo'} com sucesso!`
        )
        atualizarProdutos && atualizarProdutos()
        closeModal()
      } else {
        throw new Error(
          result.error ||
            `Erro ao ${isEditing ? 'editar' : 'salvar'} produto!`
        )
      }
    } catch (error) {
      console.error('Falha na submissão do formulário:', error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

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
        }).format((response.prices[0]?.amount || 0) / 100)
      )
      setImagensExistentes(response.images || [])
      setTipoProduto(response.metadata?.tipo || '')
      setTipoPintura(response.metadata?.tipoPintura || '')
      setIdioma(response.metadata?.idioma || '')
      setPdf(response.metadata?.pdf || null)
    } catch (error) {
      console.error(
        'Erro detalhado ao buscar produto:',
        error.response || error
      )
      alert(
        'Não foi possível carregar os dados do produto. Verifique o console do navegador para mais detalhes.'
      )
    } finally {
      setLoadingProdutos(false)
    }
  }

  useEffect(() => {
    if (idProduct) {
      fetchProdutoById(idProduct)
    }
  }, [idProduct])

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
      {isLoading || loadingProdutos ? (
        <Loading />
      ) : (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
          onClick={closeModal}
        >
          <div
            className='bg-white p-10 rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto w-full flex flex-col gap-9'
            onClick={e => e.stopPropagation()}
          >
            <h1 className='text-2xl font-bold text-dark-purple'>
              {idProduct ? 'Editar Produto' : 'Adicionar Produto'}
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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

              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-dark-purple'>
                  Imagens do Produto
                  <span className='text-sm font-normal text-gray-500'>
                    {' '}
                    (máx 8)
                  </span>
                </label>
                <input
                  type='file'
                  multiple
                  accept='image/png, image/jpeg'
                  onChange={handleFileSelection}
                  className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-dark-purple hover:file:bg-violet-100'
                />
                {arquivosParaUpload.length > 0 && (
                  <div className='text-xs text-green-600 mt-1'>
                    {arquivosParaUpload.length} nova(s) imagem(s)
                    selecionada(s) para upload.
                  </div>
                )}
              </div>

              {idProduct && imagensExistentes.length > 0 && (
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold text-dark-purple'>
                    Imagens Atuais
                  </label>
                  <div className='flex flex-wrap gap-2 p-2 border rounded-md'>
                    {imagensExistentes.map(imgUrl => (
                      <img
                        key={imgUrl}
                        src={imgUrl}
                        alt='Imagem existente'
                        className='h-20 w-20 object-cover rounded'
                      />
                    ))}
                  </div>
                </div>
              )}

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

              <div className='flex justify-end mt-4'>
                <Button
                  variant={'brown'}
                  type={'submit'}
                  label={
                    idProduct ? 'Salvar Alterações' : 'Adicionar Produto'
                  }
                  disabled={isLoading}
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
