'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from './Button'

const Produtos = ({
  nomeProduto,
  descricaoProduto,
  precoProduto,
  onClickBuy,
  arrayImagens,
}) => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(arrayImagens[0])

  const handleBack = () => {
    router.back()
  }

  const renderImages = (images, size) => {
    return images.map((src, index) => (
      <div
        key={index}
        className={`bg-white w-full rounded-lg shadow-lg ${size} cursor-pointer`}
        onClick={() => setSelectedImage(src)}
      >
        <div className='flex justify-center p-3'>
          <Image
            src={src}
            alt={`Imagem ${index + 1}`}
            width={size === 'h-32' ? 100 : 200}
            height={size === 'h-32' ? 100 : 200}
            className='rounded-lg'
          />
        </div>
      </div>
    ))
  }

  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      {/* Desktop */}
      <div className='hidden md:flex justify-between items-center px-60 pt-14 pb-16 w-full gap-20'>
        <div className='flex justify-center items-center w-1/2 gap-5'>
          <div className='flex flex-col gap-5'>
            {renderImages(arrayImagens, 'min-h-32')}
          </div>
          <div className='bg-white w-full h-128 rounded-lg shadow-lg flex justify-center items-center'>
            <div className='flex justify-center p-3 items-center object-scale-down'>
              <Image
                src={selectedImage}
                alt='Imagem da Receita'
                width={300}
                height={300}
                className='object-fill rounded-lg'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-16 p-5 bg-white shadow-lg w-1/2 min-h-144 rounded-lg'>
          <button
            className='self-start flex gap-2 items-center cursor-pointer'
            onClick={handleBack}
          >
            <Image
              src='/icons/arrow.png'
              alt='Voltar'
              width={30}
              height={30}
            />
            <span className='uppercase font-semibold text-sm hover:underline underline-offset-4'>
              voltar
            </span>
          </button>
          <div className='flex flex-col justify-center items-center gap-10 h-full'>
            <div className='flex flex-col gap-8 px-5'>
              <span className='text-4xl font-moreSugar text-center'>
                {nomeProduto}
              </span>
              <span className='text-justify'>{descricaoProduto}</span>
              <span className='font-bold text-xl font-moreSugarThin'>
                R$ {precoProduto}
              </span>
            </div>
            <Button
              label='Comprar'
              variant={'brown'}
              onClick={onClickBuy}
            />
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className='block md:hidden w-full h-screenHeader overflow-y-auto px-5 py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14'>
        <div className='flex flex-col gap-5 bg-white shadow-lg min-h-144 rounded-lg p-5'>
          <button
            className='self-start flex gap-2 items-center cursor-pointer'
            onClick={handleBack}
          >
            <Image
              src='/icons/arrow.png'
              alt='Voltar'
              width={30}
              height={30}
            />
            <span className='uppercase font-semibold text-sm hover:underline underline-offset-4'>
              voltar
            </span>
          </button>
          <div className='flex flex-col justify-center items-center gap-10 h-full'>
            <div className='flex justify-center p-3'>
              <Image
                src={selectedImage}
                alt='Imagem da Receita'
                width={200}
                height={200}
              />
            </div>
            <div className='flex flex-col gap-5 px-2'>
              <span className='text-4xl font-moreSugar text-center'>
                {nomeProduto}
              </span>
              <span className='text-justify'>{descricaoProduto}</span>
              <span className='font-bold text-xl font-moreSugarThin'>
                R$ {precoProduto}
              </span>
            </div>
            <Button
              label='Comprar'
              variant={'brown'}
              onClick={onClickBuy}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Produtos
