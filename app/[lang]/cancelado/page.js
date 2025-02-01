'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'

const messages = {
  'pt-br': {
    title: 'Ops! Algo deu errado no seu pagamento',
    description:
      'Tente novamente ou entre em contato por email para nossa equipe ajudá-lo a concluir sua compra.',
  },
  eng: {
    title: 'Ops! Something went wrong with your payment',
    description:
      'Try again or contact us by email for our team to help you complete your purchase.',
  },
}

const Cancelado = () => {
  const { lang } = useParams()
  const content = messages[lang] || messages['pt-br'] // Se não for eng ou pt, padrão para pt

  return (
    <div className='w-full h-screenHeader overflow-y-auto py-10 px-5 lg:py-8 lg:px-96 flex items-center justify-center'>
      <div className='bg-white rounded-3xl shadow-lg flex gap-6 justify-center items-center py-5 px-6 md:px-8'>
        <div className='flex'>
          <Image
            src={'/icons/linhaErro.svg'}
            alt={'Icone da Mirumuh'}
            width={300}
            height={300}
          ></Image>
        </div>
        <div className='flex flex-col justify-center items-center gap-6 px-10'>
          <div className='flex justify-center items-center'>
            <h2 className='text-[22px] font-semibold'>{content.title}</h2>
          </div>
          <div className='flex justify-center items-center'>
            <p className='text-[16px] text-justify'>
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cancelado
