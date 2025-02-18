'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'

const Navbar = ({ isOpen, closeMenu }) => {
  const navItems = [
    { label: 'Receitas', path: '/receitas', disabled: false },
    { label: 'Amigurumis', path: '/', disabled: true },
    { label: 'Artes', path: '/', disabled: true },
    { label: 'Sobre', path: '/sobre', disabled: false },
    { label: 'Login', path: '/', disabled: true },
    { label: 'Conta', path: '/', disabled: true },
  ]

  return (
    <nav className='relative z-20'>
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col md:flex md:flex-row gap-4 md:gap-20 font-semibold uppercase justify-center py-6`}
      >
        {navItems.map((item, index) => (
          <Fragment key={index}>
            {!item.disabled && (
              <Link
                href={item.path}
                className={`p-2 hover:bg-bege rounded-2xl text-center ${
                  item.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
