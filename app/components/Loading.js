import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center flex-col gap-10'>
      <div className='flex flex-col items-center justify-center w-32 h-32 animate-jump'>
        <Image
          src={'/images/coelho.png'}
          alt={'Icone da Mirumuh'}
          width={300}
          height={300}
        />
      </div>
      <div className='flex justify-center items-center gap-6 px-10'>
        <div className='dot bg-white w-3 h-3'></div>
        <div className='dot bg-white w-3 h-3'></div>
        <div className='dot bg-white w-3 h-3'></div>
        <div className='dot bg-white w-3 h-3'></div>
      </div>
    </div>
  )
}

export default Loading
