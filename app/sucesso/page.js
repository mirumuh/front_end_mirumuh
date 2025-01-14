import Image from 'next/image'
import React from 'react'

const Sucesso = () => {
  return (
    <div className='w-full h-screenHeader overflow-y-auto py-10 px-5 lg:py-8 lg:px-96 flex items-center justify-center'>
      <div className='bg-white rounded-3xl shadow-lg flex gap-6 justify-center items-center py-5 px-6 md:px-8'>
        <div className='flex'>
          <Image
            src={'/icons/logo_marcado.png'}
            alt={'Icone da Mirumuh'}
            width={300}
            height={300}
          ></Image>
        </div>
        <div className='flex flex-col justify-center items-center gap-6 px-10'>
          <div className='flex justify-center items-center'>
            <h2 className='text-[22px] font-semibold'>
              Obrigada por comprar na Mirumuh!
            </h2>
          </div>
          <div className='flex justify-center items-center '>
            <p className='text-[16px] text-justify'>
              Faça o download aqui ou verifique seu e-mail para confirmar o
              recebimento do PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sucesso
