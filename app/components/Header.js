import Image from 'next/image'
import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='bg-light-pink flex flex-col justify-center w-full py-7 px-4 gap-8 shadow-md'>
      <Link href={'/sobre'} className='flex justify-center items-center'>
        <Image
          src='/icons/logoFullMarcado.png'
          alt='Ateliê da Mirumuh'
          className=''
          width={300}
          height={200}
        />
      </Link>

      <Navbar />
    </header>
  )
}

export default Header
