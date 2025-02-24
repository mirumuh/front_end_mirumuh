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
      description: 'e se eu eskrever um texto muitooooooooooooooooooo longo',
      price: 'R$ ,00',
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      <div className='flex flex-col justify-center items-center gap-5 px-5 py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14'>
        <div className='bg-white rounded-3xl shadow-lg p-6 w-full max-w-5xl flex flex-col items-center'>
          <div className='w-full bg-blue p-4 rounded-lg shadow-lg mb-2'>
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Pagination, Autoplay]}
              className='rounded-lg overflow-hidden flex flex-col items-center justify-center'
            >
              {slides.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className='px-2 py-4 w-full flex flex-col items-center justify-center'
                >
                  <div className='flex flex-col items-center gap-2 w-full text-center'>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={250}
                      height={250}
                      className='object-cover rounded-3xl'
                    />
                    <h2 className='text-xl font-semibold text-light-darker-brown'>
                      {slide.title}
                    </h2>
                    <p className='font-bold text-md text-brown'>
                      {slide.price}
                    </p>
                    <p className='text-gray-500 text-sm pb-4'>{slide.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
  
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3 w-full'>
            <button
              className='bg-blue px-3 py-6 rounded-lg flex flex-col items-center shadow w-full gap-1'
              onClick={() => setIsModalOpen(true)}
            >
              <div className='flex justify-center items-center w-14 h-14'>
                <Image src='/icons/chat.svg' alt='Encomendar produto' width={40} height={40} />
              </div>
              <span className='text-brown text-sm'>Encomende seu produto</span>
            </button>
  
            <ModalRedirecionamento isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  
            <button
              className='bg-blue px-3 py-6 rounded-lg flex flex-col items-center shadow w-full gap-1'
              onClick={() => router.push('/receitas')}
            >
              <div className='flex justify-center items-center w-14 h-14'>
                <Image src='/icons/descubra.svg' alt='Descubra receitas' width={40} height={40} />
              </div>
              <span className='text-brown text-sm'>Descubra as receitas</span>
            </button>
  
            <button className='bg-blue px-3 py-6 rounded-lg flex flex-col items-center shadow w-full gap-1'>
              <div className='flex justify-center items-center w-14 h-14'>
                <Image src='/icons/ajuda.svg' alt='Ajuda' width={40} height={40} />
              </div>
              <span className='text-brown text-sm'>Ajuda</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )   
}  

export default HomePage
