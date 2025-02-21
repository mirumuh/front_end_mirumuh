'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from './Button'
import BackButton from './BackButton'
import Loading from './Loading'

const Produtos = ({
  nomeProduto,
  descricaoProduto,
  precoProduto,
  onClickBuy,
  arrayImagens,
}) => {
  /*  const [selectedImage, setSelectedImage] = useState()
  const [currentIndex, setCurrentIndex] = useState(0) */

  const [isLoading, setIsLoading] = useState(true)

  /*  const renderImages = (images, size) => {
    return images.map((src, index) => (
      <div
        key={index}
        className={`bg-white w-full rounded-lg shadow-lg ${size} cursor-pointer`}
        onClick={() => {
          setSelectedImage(src)
          setCurrentIndex(index)
        }}
      >
        <div className='flex justify-center p-3'>
          <Image
            src={src}
            alt={`Imagem ${index + 1}`}
            width={size === 'h-32' ? 100 : 200}
            height={size === 'h-32' ? 100 : 200}
            className='rounded-lg'
            loader={({ src }) => src}
          />
        </div>
      </div>
    ))
  }
  const handlePrevImage = () => {
    const newIndex =
      (currentIndex - 1 + arrayImagens.length) % arrayImagens.length
    setSelectedImage(arrayImagens[newIndex])
    setCurrentIndex(newIndex)
  }

  const handleNextImage = () => {
    const newIndex = (currentIndex + 1) % arrayImagens.length
    setSelectedImage(arrayImagens[newIndex])
    setCurrentIndex(newIndex)
  } */

  const handleImageLoad = () => {
    setIsLoading(false)
  }
  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      {/* Desktop */}
      <div className='hidden md:flex justify-between items-center px-60 pt-14 pb-16 w-full gap-20'>
        <div className='flex justify-center items-center w-1/2 gap-5'>
          {/*  <div className='flex flex-col gap-5'>
            {renderImages(arrayImagens, 'min-h-32')}
          </div> */}
          <div className='bg-white w-full h-128 rounded-lg shadow-lg flex justify-center items-center gap-2'>
            {/*   <Button label='&lt;' onClick={handlePrevImage} /> */}
            <div className='flex justify-center p-3 items-center object-scale-down'>
              {isLoading && (
                <div className='absolute inset-0 flex justify-center items-center'>
                  <Loading />
                </div>
              )}
              <Image
                src={arrayImagens[0]}
                alt='Imagem da Receita'
                width={300}
                height={300}
                className={`object-fill rounded-lg transition-opacity duration-500 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoadingComplete={handleImageLoad}
              />
            </div>
            {/*  <Button label='&gt;' onClick={handleNextImage} /> */}
          </div>
        </div>
        <div className='flex flex-col gap-16 p-5 bg-white shadow-lg w-1/2 min-h-144 rounded-lg'>
          <BackButton />
          <div className='flex flex-col justify-center items-center gap-10 h-full'>
            <div className='flex flex-col gap-8 px-5'>
              <span className='text-4xl font-moreSugar text-center'>
                {nomeProduto}
              </span>
              <span className='text-justify'>{descricaoProduto}</span>
              <span className='font-bold text-xl font-moreSugarThin'>
                R$ {(precoProduto / 100).toFixed(2)}
              </span>
              {/* 
              <LanguageSwitcher
                language={language}
                setLanguage={setLanguage}
              /> */}
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
          <BackButton />
          <div className='flex flex-col justify-center items-center gap-10 h-full'>
            <div className='w-full h-128 flex justify-center items-center gap-10'>
              {/*    <Button label='&lt;' onClick={handlePrevImage} /> */}
              <div className='flex justify-center p-3 items-center object-scale-down'>
                <Image
                  src={arrayImagens[0]}
                  alt='Imagem da Receita'
                  width={300}
                  height={300}
                  className='object-fill rounded-lg'
                  loader={({ src }) => src}
                />
              </div>
              {/*    <Button label='&gt;' onClick={handleNextImage} /> */}
            </div>
            <div className='flex flex-col gap-5 px-2'>
              <span className='text-4xl font-moreSugar text-center'>
                {nomeProduto}
              </span>
              <span className='text-justify'>{descricaoProduto}</span>
              <span className='font-bold text-xl font-moreSugarThin'>
                R$ {(precoProduto / 100).toFixed(2)}
              </span>
              {/*  <LanguageSwitcher
                language={language}
                setLanguage={setLanguage}
              /> */}
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
