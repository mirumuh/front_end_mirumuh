'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import { useRouter } from 'next/router'
import Image from 'next/image'
import ModalRedirecionamento from '../components/ModalRedirecionamento'
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

  const [isModalOpen, setIsModalOpen] = useState(false)

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
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={128}
                  height={128}
                  className='object-cover flex justify-center items-center'
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
          <button className='bg-blue p-4 rounded-lg flex flex-col items-center shadow w-full' onClick={() => setIsModalOpen(true)}>
            <Image
              src='/icons/chat.svg'
              alt='Encomendar produto'
              width={48}
              height={48}
              className='mb-2'
            />
            <span className='text-brown'>Encomende seu produto</span>
          </button>
          <ModalRedirecionamento isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
          <button className='bg-blue p-4 rounded-lg flex flex-col items-center shadow w-full'>
            <Image
              src='/icons/descubra.svg'
              alt='Descubra receitas'
              width={48}
              height={48}
              className='mb-2'
              onClick={() => router.push('/receitas')}
            />
            <span className='text-brown'>Descubra as receitas</span>
          </button>
          <button className='bg-blue p-4 rounded-lg flex flex-col items-center shadow w-full'>
            <Image
              src='/icons/ajuda.svg'
              alt='Ajuda'
              width={48}
              height={48}
              className='mb-2'
            />
            <span className='text-brown'>Ajuda</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
