import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Sobre = () => {
  const icons = [
    { href: '', src: '/icons/telefone.svg', alt: 'ícone de telefone' },
    {
      href: 'https://www.instagram.com/mirumuh/',
      src: '/icons/instagram.svg',
      alt: 'ícone de instagram',
    },
    { href: '', src: '/icons/email.svg', alt: 'ícone de email' },
    { href: '', src: '/icons/site.svg', alt: 'ícone de site' },
    { href: '', src: '/icons/canva.svg', alt: 'ícone de canvas' },
  ]

  return (
    <div className='h-screen justify-center'>
      <div className='flex flex-row justify-center items-center pt-12 pb-8'>
        <h2 className='text-[22px] font-semibold'>Sobre</h2>
      </div>
      <div className='flex flex-row justify-center items-center px-72'>
        <a className='text-[16px] text-justify'>
          A Mirumuh foi uma lojinha criada para vender amigurumis e crochês
          que eu, Carolina Coimbra, faço. Seu nome foi pensado para
          referenciar a palavra amigurumis, e hoje em dia, com o intuito de
          abrangir as aquararelas, pinturas e outras artes, transformou-se
          em Atelier da Mirumuh, com coelhinhos representando as várias
          funções que desempenho como artista visual.
        </a>
      </div>
      <div className='flex flex-row justify-center gap-3 items-center py-8'>
        {icons.map((icon, index) => (
          <Link href={icon.href} key={index} target='_blank'>
            <div className='flex flex-row bg-white rounded-lg'>
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
  )
}

export default Sobre
