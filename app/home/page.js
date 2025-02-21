'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import ModalRedirecionamento from '../components/ModalRedirecionamento'
import { useRouter } from 'next/navigation'
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
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      <div className='flex flex-col justify-center items-center gap-5 px-5 py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14'>
        <div className='bg-white rounded-3xl shadow-lg p-6 w-full max-w-5xl flex flex-col items-center'>
          <div className='w-full bg-blue p-4 rounded-lg shadow-lg mb-4'>
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000, // Define o intervalo de tempo (2 segundos)
                disableOnInteraction: false, // Continua a reprodução mesmo após a interação do usuário
              }}
              modules={[Pagination, Autoplay]}
              className='rounded-lg overflow-hidden'
            >
              {slides.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className='md:p-10 px-4 py-8 w-full'
                >
                  <div className='flex flex-col items-center justify-center gap-2 w-full md:flex-row md:gap-20'>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={200}
                      height={200}
                      className='object-cover flex justify-center items-center'
                    />
                    <div className='flex flex-col items-center md:items-start gap-2 md:gap-6 w-full md:w-1/2'>
                      <h2 className='text-2xl font-semibold text-brown-700 text-center'>
                        {slide.title}
                      </h2>
                      <div className='flex flex-col items-center md:flex-row md:justify-between gap-2 w-full'>
                        <p className='text-gray-500 text-center'>
                          {slide.description}
                        </p>
                        <span className='font-bold text-lg text-brown'>
                          {slide.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
            <button
              className='bg-blue px-4 py-8 rounded-lg flex flex-col items-center shadow w-full gap-2'
              onClick={() => setIsModalOpen(true)}
            >
              <div className='flex justify-center items-center w-16 h-16'>
                <Image
                  src='/icons/chat.svg'
                  alt='Encomendar produto'
                  width={48}
                  height={48}
                />
              </div>
              <span className='text-brown'>Encomende seu produto</span>
            </button>
            <ModalRedirecionamento
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <button
              className='bg-blue px-4 py-8 rounded-lg flex flex-col items-center shadow w-full gap-2'
              onClick={() => router.push('/receitas')}
            >
              <div className='flex justify-center items-center w-16 h-16'>
                <Image
                  src='/icons/descubra.svg'
                  alt='Descubra receitas'
                  width={48}
                  height={48}
                />
              </div>
              <span className='text-brown'>Descubra as receitas</span>
            </button>
            <button className='bg-blue px-4 py-8 rounded-lg flex flex-col items-center shadow w-full gap-2'>
              <div className='flex justify-center items-center w-16 h-16'>
                <Image
                  src='/icons/ajuda.svg'
                  alt='Ajuda'
                  width={48}
                  height={48}
                />
              </div>
              <span className='text-brown'>Ajuda</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
