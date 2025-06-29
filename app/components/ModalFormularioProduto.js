'use client'
import React, { useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression'

import Button from './Button'
import Loading from './Loading'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'
import PdfUploader from './PdfUploader'

import getProductsById from '@/services/Products/getProductsById'
import saveProducts from '@/services/Products/saveProducts'
import uploadPdfReceita from '@/services/uploadPdf'
import Image from 'next/image'
import downloadReceita from '@/services/downloadReceita'
import unzipBlob from '@/services/unzipBlob'

const ModalFormularioProduto = ({
  closeModal,
  idProduct,
  atualizarProdutos,
}) => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [pdf1, setPdf1] = useState(null)
  const [pdf2, setPdf2] = useState(null)
  const [tipoPintura, setTipoPintura] = useState('')
  const [tipoProduto, setTipoProduto] = useState('')

  const [arquivosParaUpload, setArquivosParaUpload] = useState([])
  const [imagensExistentes, setImagensExistentes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProdutos, setLoadingProdutos] = useState(false)
  const [pdfNames, setPdfNames] = useState(['', '']) // para mostrar os nomes

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

    if (!camposObrigatoriosPreenchidos()) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }
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

      if (tipoProduto === 'pintura')
        formData.append('tipoPintura', tipoPintura)

      if (tipoProduto === 'receita' && pdf1 && pdf2) {
        let pdfs = [pdf1, pdf2]
        pdfs = renamePdfFiles(pdfs, titulo)
        formData.append('pdfs', JSON.stringify(pdfs.map(pdf => pdf.name)))
      }

      const isEditing = !!idProduct
      const method = isEditing ? 'PATCH' : 'POST'
      const endpoint = isEditing ? `/product/${idProduct}` : '/product'

      const response = await saveProducts(method, endpoint, formData)

      if (tipoProduto === 'receita') {
        if (pdf1 && pdf2) {
          var pdfs = [pdf1, pdf2]
          pdfs = renamePdfFiles(pdfs, titulo)
          await uploadPdfReceita(pdfs)
        }
      }

      if (response) {
        atualizarProdutos && atualizarProdutos()
        closeModal()
      } else {
        throw new Error(
          response.error ||
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

      const pdfIds = response.metadata?.pdfs || []

      if (pdfIds.length === 2) {
        const blobZip = await downloadReceita(pdfIds)
        const zip = await unzipBlob(blobZip)
        setPdf1(zip[0])
        setPdf2(zip[1])
        setPdfNames([zip[0].name, zip[1].name])
      }
    } catch (error) {
      console.error('Erro detalhado ao buscar produto:', error)
      alert('Não foi possível carregar os dados do produto.')
    } finally {
      setLoadingProdutos(false)
    }
  }

  const renamePdfFiles = (files, titulo) => {
    return files.map((file, index) => {
      const prefix = index === 0 ? 'PTBR_' : 'EN_'

      // Cria o novo nome usando o título
      const sanitizedTitle = titulo.replace(/\s+/g, '_')
      const newFileName = `${prefix}${sanitizedTitle}.pdf`

      const renamedFile = new File([file], newFileName, {
        type: file.type,
      })
      return renamedFile
    })
  }

  useEffect(() => {
    if (idProduct) {
      fetchProdutoById(idProduct)
    }
  }, [idProduct])

  const receitaForm = (
    <>
      <PdfUploader
        label={'PDF do Produto (Português)'}
        onPdfUpload={file => setPdf1(file)}
      />
      <PdfUploader
        label={'PDF do Produto (Inglês)'}
        onPdfUpload={file => setPdf2(file)}
      />
      {/* {[pdf1, pdf2].map((pdf, index) => (
        <div key={index} className='flex flex-col gap-1'>
          <label className='font-semibold text-dark-purple'>
            PDF do Produto ({index === 0 ? 'Português' : 'Inglês'})
          </label>

          {pdf ? (
            <div className='flex items-center justify-between bg-gray-100 p-2 rounded'>
              <span className='text-sm truncate max-w-[70%]'>
                {pdf.name || pdfNames[index]}
              </span>
              <div className='flex gap-2'>
                <a
                  href={URL.createObjectURL(pdf)}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 text-xs underline'
                >
                  Visualizar
                </a>
                <button
                  type='button'
                  onClick={() =>
                    index === 0 ? setPdf1(null) : setPdf2(null)
                  }
                  className='text-red-600 text-xs'
                >
                  Remover
                </button>
              </div>
            </div>
          ) : (
            <PdfUploader
              label={`Enviar novo PDF (${
                index === 0 ? 'Português' : 'Inglês'
              })`}
              onPdfUpload={file =>
                index === 0 ? setPdf1(file) : setPdf2(file)
              }
            />
          )}
        </div>
      ))} */}
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

  const camposObrigatoriosPreenchidos = () => {
    if (
      !titulo.trim() ||
      !descricao.trim() ||
      !preco.trim() ||
      !tipoProduto ||
      (!idProduct && arquivosParaUpload.length === 0)
    ) {
      return false
    }
    if (tipoProduto === 'pintura' && !tipoPintura) return false
    if (tipoProduto === 'receita' && (!pdf1 || !pdf2)) return false
    return true
  }

  const handleRemoveImagemExistente = url => {
    const confirmDelete = confirm(
      'Tem certeza que deseja remover esta imagem?'
    )
    if (!confirmDelete) return

    setImagensExistentes(prev => prev.filter(imagem => imagem !== url))
  }

  return (
    <>
      {isLoading || loadingProdutos ? (
        <Loading />
      ) : (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-10 rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto w-full flex flex-col gap-9'>
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
                      <div key={imgUrl} className='relative'>
                        <Image
                          src={imgUrl}
                          alt='Imagem existente'
                          width={80}
                          height={80}
                          className='h-20 w-20 object-cover rounded'
                        />
                        <button
                          type='button'
                          onClick={() =>
                            handleRemoveImagemExistente(imgUrl)
                          }
                          className='absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700'
                          title='Remover imagem'
                        >
                          ×
                        </button>
                      </div>
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
                <button
                  type='button'
                  onClick={closeModal}
                  className='mr-4 px-4 py-2 text-dark-purple rounded '
                >
                  Cancelar
                </button>
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
