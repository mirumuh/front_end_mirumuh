'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'

const Navbar = ({ isOpen, closeMenu }) => {
  const [logado, setLogado] = useState(false)
  const router = usePathname()

  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if (token) {
      setLogado(true)
    } else {
      setLogado(false)
    }

  }, [])

  const navItems = [
    { label: 'Home', path: '/', disabled: false },
    { label: 'Receitas', path: '/receitas', disabled: false },
    { label: 'Amigurumis', path: '/amigurumis', disabled: false },
    { label: 'Pinturas', path: '/pinturas', disabled: false },
    { label: 'Sobre', path: '/sobre', disabled: false },
    { label: 'Login', path: '/login', disabled: logado },
    { label: 'Conta', path: '/conta', disabled: !logado },
  ]

  const handleLinkClick = () => {
    if (isOpen) {
      closeMenu()
    }
  }

  return (
    <nav className='relative z-20'>
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col md:flex md:flex-row gap-4 md:gap-20 font-semibold uppercase justify-center md:py-3 py-6`}
      >
        {navItems.map((item, index) => (
          <Fragment key={index}>
            {!item.disabled && (
              <Link
                href={item.path}
                className={`p-2 hover:bg-bege rounded-2xl text-center ${
                  item.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${router === item.path ? 'bg-bege' : ''}`}
                onClick={handleLinkClick}
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