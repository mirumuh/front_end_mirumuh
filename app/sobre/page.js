import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Sobre = () => {
  const icons = [
    {
      href: 'https://www.youtube.com/@Mirumuh',
      src: '/icons/youtube.svg',
      alt: 'ícone de youtube',
    },
    {
      href: 'https://www.instagram.com/mirumuh/',
      src: '/icons/instagram.svg',
      alt: 'ícone de instagram',
    },
    {
      href: 'mailto:atelierdamirumuh@gmail.com',
      src: '/icons/email.svg',
      alt: 'ícone de email',
    },
    { href: '', src: '/icons/site.svg', alt: 'ícone de site' },
    { href: '', src: '/icons/canva.svg', alt: 'ícone de canvas' },
  ]

  return (
    <div className='w-full h-screenHeader overflow-y-auto py-10 px-5 lg:py-8 lg:px-96 flex items-center justify-center'>
      <div className='bg-white rounded-3xl shadow-lg flex flex-col gap-6 justify-center items-center py-5 px-6 md:px-8'>
        <div className='flex flex-row justify-center items-center'>
          <h2 className='text-[22px] font-semibold'>Sobre</h2>
        </div>
        <div className='flex flex-row justify-center items-center '>
          <p className='text-[16px] text-justify'>
            A Mirumuh foi uma lojinha criada para vender{' '}
            <em className='font-italic'>amigurumis</em> e crochês que eu,
            Carolina Coimbra, faço. Seu nome foi pensado para referenciar a
            palavra <em className='font-italic'>amigurumis</em>, e hoje em
            dia, com o intuito de abrangir as aquararelas, pinturas e
            outras artes, transformou-se em{' '}
            <strong className='font-semibold'>Atelier da Mirumuh</strong>,
            com coelhinhos representando as várias funções que desempenho
            como artista visual.
          </p>
        </div>
        <div className='flex justify-center gap-3 items-center '>
          {icons.map((icon, index) => (
            <Link href={icon.href} key={index} target='_blank'>
              <div className='flex'>
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={50}
                  height={50}
                ></Image>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sobre
