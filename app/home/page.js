'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import { useRouter } from 'next/router'
const HomePage = () => {
  const [slides] = useState([
    {
      image: '/produtos/coelhoDragaor.svg',
      title: 'Coelho Dragão',
      description: 'receita disponível!',
      price: 'R$ 30,00',
    },
    {
      image: '/produtos/coelhoGelidor.svg',
      title: 'Coelho Gélido',
      description: 'receita disponível!',
      price: 'R$ 300,00',
    },
    {
      image: '/icons/coelhoBalder.svg',
      title: 'Coelho Balde',
      description: 'TESTE',
      price: 'R$ ,00',
    },
    // Adicione mais slides conforme necessário
  ])

  return (
    <div className='w-full h-screenHeader overflow-y-auto py-10 px-5 lg:py-8 lg:px-96 flex items-center justify-center'>
      <div className='bg-white rounded-3xl shadow-lg p-6 w-full max-w-5xl flex flex-col items-center'>
        <div className='w-full bg-blue p-4 rounded-lg shadow-lg mb-4'>
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000, // Define o intervalo de tempo (2 segundos)
              disableOnInteraction: false, // Continua a reprodução mesmo após a interação do usuário
            }}
            modules={[Pagination, Autoplay]}
            className='rounded-lg overflow-hidden'
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className='p-4 flex flex-col items-center'
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className='h-32 w-32 object-cover flex justify-center items-center'
                />
                <h2 className='text-xl font-semibold text-brown-700 text-center'>
                  {slide.title}
                </h2>
                <p className='text-gray-500 text-center'>
                  {slide.description}
                </p>
                <span className='font-bold text-brown'>{slide.price}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
          <button className='bg-blue p-4 rounded-lg flex flex-col items-center shadow w-full'>
            <img
              src='/icons/chat.svg'
              alt='Encomendar produto'
              className='h-12 w-12 mb-2'
            ></img>
            <span className='text-brown'>Encomende seu produto</span>
          </button>
          <button className='bg-blue p-4 rounded-lg flex flex-col items-center shadow w-full'>
            <img
              src='/icons/descubra.svg'
              alt='Descubra receitas'
              className='h-12 w-12 mb-2'
              onClick={() => router.push('/receitas')}
            ></img>
            <span className='text-brown'>Descubra as receitas</span>
          </button>
          <button className='bg-blue p-4 rounded-lg flex flex-col items-center shadow w-full'>
            <img
              src='/icons/ajuda.svg'
              alt='Ajuda'
              className='h-12 w-12 mb-2'
            ></img>
            <span className='text-brown'>Ajuda</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
