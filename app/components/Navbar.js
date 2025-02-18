'use client'

import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

const Navbar = ({ isOpen, closeMenu }) => {
  const [logado, setLogado] = useState(false)
  const token = sessionStorage.getItem('token')

  const verifyLogin = token => {
    if (token !== null) {
      setLogado(true)
    } else {
      setLogado(false)
    }
  }

  useEffect(() => {
    verifyLogin(token)
  }, [token])

  const navItems = [
    { label: 'Home', path: '/', disabled: false },
    { label: 'Receitas', path: '/receitas', disabled: false },
    { label: 'Amigurumis', path: '/amigurimis', disabled: true },
    { label: 'Artes', path: '/artes', disabled: true },
    { label: 'Sobre', path: '/sobre', disabled: false },
    { label: 'Login', path: '/login', disabled: logado },
    { label: 'Conta', path: '/conta', disabled: !logado },
  ]

  const handleLinkClick = path => {
    if (
      !logado &&
      (path === '/receitas' || path === '/amigurumis' || path === '/artes')
    ) {
      window.location.href = '/login'
    } else {
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
                }`}
                onClick={() => {
                  handleLinkClick(item.path)
                }}
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
