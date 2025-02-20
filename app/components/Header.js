'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Navbar from './Navbar'
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden'
          onClick={closeMenu}
        ></div>
      )}
      <header
        className={`relative bg-light-pink flex flex-col justify-center w-full pt-7 px-4 gap-8 md:gap-4 shadow-md z-20 `}
      >
        <div className='flex justify-between gap-3 items-center w-full md:justify-center'>
          <Link
            href={'/sobre'}
            className='flex justify-center items-center'
          >
            <Image
              src='/icons/logoFullMarcado.png'
              alt='Ateliê da Mirumuh'
              className=''
              width={300}
              height={200}
            />
          </Link>

          <div className='md:hidden flex justify-center '>
            <button onClick={toggleMenu} className='text-2xl'>
              {isMenuOpen ? (
                <Image
                  src={'/icons/close.svg'}
                  alt={'ícone de fechar'}
                  width={50}
                  height={50}
                />
              ) : (
                <Image
                  src={'/icons/menu.svg'}
                  alt={'ícone de menu'}
                  width={50}
                  height={50}
                />
              )}
            </button>
          </div>
        </div>

        <Navbar
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
        />
      </header>
    </>
  )
}

export default Header
