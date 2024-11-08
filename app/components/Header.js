import Image from 'next/image'
import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='bg-blue flex flex-col justify-center w-full p-4 gap-8 shadow-md'>
      <Link href={'/'} className='flex justify-center items-center'>
        <Image
          src='/icons/fullLogo.png'
          alt='Ateliê da Mirumuh'
          className=''
          width={250}
          height={200}
        />
      </Link>

      <Navbar />
    </header>
  )
}

export default Header
