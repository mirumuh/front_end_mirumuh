'use client'
import React, { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import Button from './Button'
import checkoutPayment from '@/services/checkout'
import Loading from './Loading'
import Image from 'next/image'

const Modal = ({ produto, closeModal }) => {
  const [language, setLanguage] = useState('pt-br')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const encode = text => {
    const encoder = new TextEncoder()
    const encodedData = encoder.encode(text)
    return btoa(String.fromCharCode(...encodedData))
  }

  const pdfName = name => {
    const formattedName = name.replace(/ /g, '_')
    return encode(`${formattedName}.pdf`)
  }

  console.log(pdfName(produto.name))

  const checkout = async e => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await checkoutPayment(
        email,
        produto.prices[0].id,
        1,
        language,
        pdfName(produto.name)
      )
      if (response) {
        window && (window.location.href = response.url)
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isReceita = produto.metadata.tipo === 'receita'
  const isPintura = produto.metadata.tipo === 'pinturas'
  
  const mensagem = encodeURIComponent(
    `Olá, me interessei por ${produto?.name} no valor de R$ ${(
      produto?.prices[0]?.amount / 100
    ).toFixed(2)} no site da Mirumuh!`
  )

  const contato = process.env.NEXT_PUBLIC_NUMBER

  const link = `https://wa.me/${contato}?text=${mensagem}`

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
            className='bg-white rounded-lg shadow-lg p-6 w-full sm:w-50 md:w-2/5 relative'
            onClick={e => e.stopPropagation()}
          >
            <button
              className='absolute top-3 right-3 text-brown hover:light-darker-brown'
              onClick={closeModal}
            >
              ✖
            </button>

            <h2 className='text-brown font-semibold text-center text-[22px] px-8'>
              {isReceita
                ? 'Encomenda de Receita'
                : `Encomenda de ${produto.name}`}
            </h2>

            {isReceita ? (
              <form onSubmit={checkout} className='flex flex-col gap-4'>
                <div className='flex flex-col justify-between items-center gap-5'>
                  <span className='text-brown text-center'>
                    Fique atento à linguagem da receita que você está
                    comprando! Preencha seu e-mail para receber a receita:
                  </span>
                  <input
                    type='email'
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                    placeholder='E-mail'
                    className='border border-gray-300 rounded p-2 w-96'
                  />
                  <input
                    type='email'
                    value={confirmEmail}
                    required
                    onChange={e => setConfirmEmail(e.target.value)}
                    placeholder='Confirme seu e-mail'
                    className='border border-gray-300 rounded p-2 w-96'
                  />
                  <Button variant='brown' type='submit' label='Comprar' />
                </div>
              </form>
            ) : isPintura ? (
              <div className='text-brown text-center p-2 mt-4'>
                <p className='mb-4'>
                  Essa pintura é única! Você pode compra-lá comigo entrando
                  em contato {'<'}3
                </p>
                <div className='flex justify-center'>
                  <a
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-brown text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-light-darker-brown'
                  >
                    <Image
                      src='/icons/telefone.svg'
                      alt='WhatsApp'
                      width={24}
                      height={24}
                    />
                    Comprar
                  </a>
                </div>
              </div>
            ) : (
              <div className='text-brown text-center p-2 mt-4'>
                <p className='mb-4'>
                  Para comprar, garanta sua vaga na fila! Basta entrar em
                  contato comigo para realizar sua encomenda. E se quiser
                  fazer alguma alteração no produto final, podemos
                  conversar e ajustar tudo do jeitinho que você deseja!{' '}
                  {'<'}3
                </p>
                <div className='flex justify-center'>
                  <a
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-brown text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-light-darker-brown'
                  >
                    <Image
                      src='/icons/telefone.svg'
                      alt='WhatsApp'
                      width={24}
                      height={24}
                    />
                    Encomendar
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
