'use client'
import React, { useState } from 'react'

import Button from './Button'
import Loading from './Loading'

const ModalFormularioProduto = ({ closeModal }) => {
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
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
            className='bg-white p-10 rounded-lg min-w-[300px] max-w-[500px] w-1/2 flex flex-col gap-9'
            onClick={e => e.stopPropagation()}
          >
            <h1 className='text-2xl font-bold text-dark-purple'>
              Adicionar Produto
            </h1>
            <form
              onSubmit={saveProduct}
              className='flex flex-col gap-6'
              onClick={e => e.stopPropagation()}
            >
              <div className='flex flex-col gap-2'>
                <span className='font-semibold text-sm text-dark-purple'>
                  Tipo de Produto
                </span>
                <select
                  className='border border-gray-300 rounded p-2 w-full appearance-none '
                  style={{
                    backgroundImage: 'url("/icons/arrow.svg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5rem',
                  }}
                  value={tipoProduto}
                  onChange={e => setTipoProduto(e.target.value)}
                >
                  <option value='' disabled className='text-gray-50'>
                    Selecione uma opção
                  </option>
                  <option value='amigurumi'>Amigurumi</option>
                  <option value='pintura'>Pintura</option>
                  <option value='receita'>Receita</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='font-semibold text-sm text-dark-purple'>
                  Tipo de Pintura
                </span>
                <select
                  className='border border-gray-300 rounded p-2 w-full appearance-none '
                  style={{
                    backgroundImage: 'url("/icons/arrow.svg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5rem',
                  }}
                  value={tipoProduto}
                  onChange={e => setTipoProduto(e.target.value)}
                >
                  <option value='' disabled className='text-gray-50'>
                    Selecione uma opção
                  </option>
                  <option value='amigurumi'>Amigurumi</option>
                  <option value='pintura'>Pintura</option>
                  <option value='receita'>Receita</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='font-semibold text-sm text-dark-purple'>
                  Tipo de Pintura
                </span>
                <input
                  type='email'
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                  placeholder='E-mail'
                  className='border border-gray-300 rounded p-2 w-full'
                />
              </div>

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
