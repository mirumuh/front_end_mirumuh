import Link from 'next/link'
import React from 'react'

const Navbar = ({ variant }) => {
  const navItems = [
    { label: 'Receitas', path: '/receitas', disabled: false },
    { label: 'Amigurumis', path: '/', disabled: true },
    { label: 'Artes', path: '/', disabled: true },
    { label: 'Sobre', path: '/sobre', disabled: false },
    { label: 'Login', path: '/', disabled: true },
    { label: 'Conta', path: '/', disabled: true },
  ]
  return (
    <nav className='flex gap-20 font-semibold uppercase justify-center'>
      {navItems.map((item, index) => (
        <>
          {!item.disabled && (
            <Link
              href={item.path}
              key={index}
              disabled={item.disabled}
              className={`p-2 hover:bg-bege rounded-2xl  ${
                item.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {item.label}
            </Link>
          )}
        </>
      ))}
    </nav>
  )
}

export default Navbar
