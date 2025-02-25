'use client'
import React, { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import Button from './Button'
import checkoutPayment from '@/services/checkout'
import Loading from './Loading'

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center '
          onClick={closeModal}
        >
          <form
            onSubmit={checkout}
            className='bg-white p-10 rounded-lg flex flex-col gap-4'
            onClick={e => e.stopPropagation()}
          >
            <LanguageSwitcher
              language={language}
              setLanguage={setLanguage}
            />
            <div className='flex flex-col justify-between items-center gap-5'>
              <span className='text-lg font-semibold'>
                {language === 'pt-br'
                  ? 'Preencha seu e-mail para receber a receita:'
                  : 'Fill in your e-mail to receive the recipe:'}
              </span>
              <input
                type='email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                placeholder='E-mail'
                className='border border-gray-300 rounded p-2 w-full'
              />

              <input
                type='email'
                value={confirmEmail}
                required
                onChange={e => setConfirmEmail(e.target.value)}
                placeholder={
                  language === 'pt-br'
                    ? 'Confirme seu e-mail'
                    : ' Confirm your e-mail'
                }
                className='border border-gray-300 rounded p-2 w-full'
              />
              <Button
                variant={'brown'}
                type={'submit'}
                label={language === 'pt-br' ? 'Comprar' : 'Checkout'}
              />
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Modal
