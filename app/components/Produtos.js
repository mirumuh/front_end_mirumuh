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
  metadata,
  onClickBuy,
  arrayImagens,
}) => {
  const [selectedImage, setSelectedImage] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const tipoProduto = metadata?.tipo
  const pinturaAtiva = metadata?.pinturaAtiva === 'true'
  const quantidadeAmigurumi = metadata?.quantidade

  const renderImages = (images, size) => {
    return images.map((src, index) => (
      <div
        key={index}
        className={`bg-white w-full rounded-lg shadow-lg ${size} cursor-pointer`}
        onClick={() => {
          setSelectedImage(src)
          setCurrentIndex(index)
        }}
      >
        <div className='flex items-center justify-center border rounded-lg h-44 w-44 overflow-hidden relative p-3'>
          <Image
            src={src}
            alt={`Imagem ${index + 1}`}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            loader={({ src }) => src}
            className='rounded-2xl p-3'
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
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      {/* Desktop */}
      <div className='hidden md:flex justify-between items-center px-60 pt-14 pb-16 w-full gap-20'>
        {metadata?.tipo !== 'pintura' || pinturaAtiva ? (
          <>
            <div className='flex justify-center items-center w-full gap-5'>
              <div className='flex flex-col gap-5'>
                {renderImages(arrayImagens, 'min-h-32')}
              </div>
              <div className='bg-white w-full h-128 rounded-lg shadow-lg flex flex-col justify-center items-center'>
                <div className='w-full h-128 flex justify-center items-center gap-2'>
                  <Button label='&lt;' onClick={handlePrevImage} />
                  <div className='flex justify-center p-3 items-center object-scale-down'>
                    {isLoading && (
                      <div className='absolute inset-0 flex justify-center items-center'>
                        <Loading />
                      </div>
                    )}

                    <div className='flex items-center justify-center border rounded-2xl w-96 p-1 h-96 overflow-hidden relative'>
                      <Image
                        src={arrayImagens[0]}
                        alt='Imagens'
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        className='rounded-2xl'
                        onLoadingComplete={handleImageLoad}
                      />
                    </div>
                  </div>
                  <Button label='&gt;' onClick={handleNextImage} />
                </div>
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
                </div>
                <Button
                  label={
                    tipoProduto === 'amigurumi'
                      ? quantidadeAmigurumi >= 1
                        ? 'Comprar'
                        : 'Encomendar'
                      : 'Comprar'
                  }
                  variant={'brown'}
                  onClick={onClickBuy}
                />
              </div>
            </div>
          </>
        ) : (
          <div className='flex justify-center items-center w-full gap-5'>
            <div className='flex flex-col gap-5'>
              {renderImages(arrayImagens, 'min-h-32')}
            </div>
            <div className='bg-white w-full h-144 rounded-lg shadow-lg flex flex-col justify-center items-center p-5'>
              <div className='flex justify-between items-center w-full gap-8 '>
                <BackButton />
                <span className='text-3xl font-moreSugar text-center'>
                  {nomeProduto}
                </span>
              </div>
              <div className='w-full h-128 flex justify-center items-center gap-2'>
                <Button label='&lt;' onClick={handlePrevImage} />
                <div className='flex justify-center p-3 items-center object-scale-down'>
                  {isLoading && (
                    <div className='absolute inset-0 flex justify-center items-center'>
                      <Loading />
                    </div>
                  )}
                  <div className='flex items-center justify-center border rounded-2xl w-96 p-1 h-96 overflow-hidden relative'>
                    <Image
                      src={arrayImagens[0]}
                      alt='Imagens'
                      fill
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      className='rounded-2xl'
                      onLoadingComplete={handleImageLoad}
                    />
                  </div>
                </div>
                <Button label='&gt;' onClick={handleNextImage} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile */}
      <div className='block md:hidden w-full h-screenHeader overflow-y-auto px-5 py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14'>
        {metadata?.tipo !== 'pintura' || pinturaAtiva ? (
          <div className='flex flex-col gap-5 bg-white shadow-lg min-h-144 rounded-lg p-5'>
            <BackButton />
            <div className='flex flex-col justify-center items-center gap-10 h-full'>
              <div className='w-full max-h-128 flex justify-center items-center gap-10'>
                <Button label='&lt;' onClick={handlePrevImage} />
                <div className='flex justify-center items-center object-scale-down'>
                  <Image
                    src={arrayImagens[0]}
                    alt='Imagem da Receita'
                    width={300}
                    height={300}
                    className='object-fill rounded-lg'
                    loader={({ src }) => src}
                  />
                </div>
                <Button label='&gt;' onClick={handleNextImage} />
              </div>
              <div className='flex flex-col gap-5 px-2'>
                <span className='text-4xl font-moreSugar text-center'>
                  {nomeProduto}
                </span>
                <span className='text-justify'>{descricaoProduto}</span>
                <span className='font-bold text-xl font-moreSugarThin'>
                  R$ {(precoProduto / 100).toFixed(2)}
                </span>
              </div>
              <Button
                label='Comprar'
                variant={'brown'}
                onClick={onClickBuy}
              />
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-5 bg-white shadow-lg min-h-144 rounded-lg p-5 justify-center'>
            <div className='flex justify-between flex-col items-center w-full gap-5'>
              <BackButton />
              <span className='text-3xl font-moreSugar text-center'>
                {nomeProduto}
              </span>
            </div>
            <div className='w-full max-h-128 flex justify-center items-center gap-2 '>
              <Button label='&lt;' onClick={handlePrevImage} />
              <div className='flex justify-center p-3 items-center object-scale-down relative'>
                {isLoading && (
                  <div className='absolute inset-0 flex justify-center items-center'>
                    <Loading />
                  </div>
                )}
                <div className='flex justify-center items-center object-scale-down'>
                  <Image
                    src={arrayImagens[0]}
                    alt='Imagem da Receita'
                    width={300}
                    height={300}
                    className='object-fill rounded-lg'
                    loader={({ src }) => src}
                  />
                </div>
              </div>
              <Button label='&gt;' onClick={handleNextImage} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Produtos
