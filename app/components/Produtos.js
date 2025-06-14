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
  const [thumbStart, setThumbStart] = useState(0)

  const tipoProduto = metadata?.tipo
  const pinturaAtiva = metadata?.pinturaAtiva === 'true'
  const quantidadeAmigurumi = metadata?.quantidade

  const thumbsToShow = 3
  const thumbs = arrayImagens.slice(thumbStart, thumbStart + thumbsToShow)

  const handlePrevThumb = () => {
    if (thumbStart > 0) setThumbStart(thumbStart - 1)
  }
  const handleNextThumb = () => {
    if (thumbStart + thumbsToShow < arrayImagens.length)
      setThumbStart(thumbStart + 1)
  }

  const renderThumbnails = () => (
    <div className='flex flex-col items-center gap-2 relative'>
      {arrayImagens.length > thumbsToShow && (
        <button
          className='mb-1 text-gray-400 hover:text-blue-600'
          onClick={handlePrevThumb}
          disabled={thumbStart === 0}
          style={{ fontSize: 18 }}
        >
          ▲
        </button>
      )}
      <div className='flex flex-col gap-2 max-h-56 overflow-y-auto'>
        {thumbs.map((src, idx) => (
          <div
            key={thumbStart + idx}
            className={`border-2 rounded-lg cursor-pointer w-16 h-16 overflow-hidden bg-white ${
              selectedImage === src ? 'border-blue-600' : 'border-gray-200'
            }`}
            onClick={() => {
              setSelectedImage(src)
              setCurrentIndex(thumbStart + idx)
            }}
          >
            <Image
              src={src}
              alt={`Miniatura ${thumbStart + idx + 1}`}
              width={64}
              height={64}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className='rounded-lg'
            />
          </div>
        ))}
      </div>
      {arrayImagens.length > thumbsToShow && (
        <button
          className='mt-1 text-gray-400 hover:text-blue-600'
          onClick={handleNextThumb}
          disabled={thumbStart + thumbsToShow >= arrayImagens.length}
          style={{ fontSize: 18 }}
        >
          ▼
        </button>
      )}
    </div>
  )

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
      <div className='hidden md:flex justify-between items-start px-60 pt-14 pb-16 w-full gap-20'>
        {metadata?.tipo !== 'pintura' || pinturaAtiva ? (
          <>
            <div className='flex justify-center items-center w-1/2 gap-5'>
              <div className='flex flex-col gap-5'>
                {renderThumbnails()}
              </div>
              <div className='bg-white w-full h-128 rounded-lg shadow-lg flex flex-col justify-center items-center'>
                <div className='w-full h-128 flex justify-center items-center gap-2 px-3'>
                  {arrayImagens.length > thumbsToShow && (
                    <Button
                      label='&lt;'
                      onClick={handlePrevImage}
                      size='small'
                    />
                  )}

                  <div className='flex justify-center p-3 items-center object-scale-down'>
                    {isLoading && (
                      <div className='absolute inset-0 flex justify-center items-center'>
                        <Loading />
                      </div>
                    )}

                    <div className='flex items-center justify-center border rounded-2xl w-96 p-1 h-96 overflow-hidden relative'>
                      <Image
                        src={selectedImage || arrayImagens[0]}
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
                  {arrayImagens.length > thumbsToShow && (
                    <Button
                      label='&gt;'
                      onClick={handleNextImage}
                      size='small'
                    />
                  )}
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
            <div className='flex flex-col gap-5'>{renderThumbnails()}</div>
            <div className='bg-white w-full h-144 rounded-lg shadow-lg flex flex-col justify-center items-center p-5'>
              <div className='flex justify-between items-center w-full gap-8 '>
                <BackButton />
                <span className='text-3xl font-moreSugar text-center'>
                  {nomeProduto}
                </span>
              </div>
              <div className='w-full h-128 flex justify-center items-center gap-2'>
                {arrayImagens.length > thumbsToShow && (
                  <Button
                    label='&lt;'
                    onClick={handlePrevImage}
                    size='small'
                  />
                )}
                <div className='flex justify-center p-3 items-center object-scale-down'>
                  {isLoading && (
                    <div className='absolute inset-0 flex justify-center items-center'>
                      <Loading />
                    </div>
                  )}
                  <div className='flex items-center justify-center border rounded-2xl w-96 p-1 h-96 overflow-hidden relative'>
                    <Image
                      src={selectedImage || arrayImagens[0]}
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

                {arrayImagens.length > thumbsToShow && (
                  <Button
                    label='&gt;'
                    onClick={handleNextImage}
                    size='small'
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile */}
      <div className='block md:hidden w-full h-screenHeader overflow-y-auto px-5 py-5 small:py-10 md:px-20 lg:px-40 lg:py-14'>
        {metadata?.tipo !== 'pintura' || pinturaAtiva ? (
          <div className='flex flex-col gap-5 bg-white shadow-lg min-h-144 rounded-lg p-5'>
            <BackButton />
            <div className='flex flex-col justify-center items-center gap-10 h-full'>
              <div className='w-full max-h-128 flex justify-center items-center gap-10'>
                {arrayImagens.length > thumbsToShow && (
                  <Button
                    label='&lt;'
                    onClick={handlePrevImage}
                    size='small'
                  />
                )}

                <div className='flex justify-center items-center object-scale-down'>
                  <Image
                    src={selectedImage || arrayImagens[0]}
                    alt='Imagem da Receita'
                    width={300}
                    height={300}
                    className='object-fill rounded-lg'
                    loader={({ src }) => src}
                  />
                </div>

                {arrayImagens.length > thumbsToShow && (
                  <Button
                    label='&gt;'
                    onClick={handleNextImage}
                    size='small'
                  />
                )}
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
              {arrayImagens.length > thumbsToShow && (
                <Button
                  label='&lt;'
                  onClick={handlePrevImage}
                  size='small'
                />
              )}

              <div className='flex justify-center p-3 items-center object-scale-down relative'>
                {isLoading && (
                  <div className='absolute inset-0 flex justify-center items-center'>
                    <Loading />
                  </div>
                )}
                <div className='flex justify-center items-center object-scale-down'>
                  <Image
                    src={selectedImage || arrayImagens[0]}
                    alt='Imagem da Receita'
                    width={300}
                    height={300}
                    className='object-fill rounded-lg'
                    loader={({ src }) => src}
                  />
                </div>
              </div>
              {arrayImagens.length > thumbsToShow && (
                <Button
                  label='&gt;'
                  onClick={handleNextImage}
                  size='small'
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Produtos
