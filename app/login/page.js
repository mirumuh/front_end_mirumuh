'use client'
import Button from '../components/Button'
import { useState } from 'react'
import Image from 'next/image'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('') // Novo estado para "confirmar senha"
  const [name, setName] = useState('') // Novo estado para "nome"
  const [isLogin, setIsLogin] = useState(true) // Estado para alternar entre login e cadastro

  const handleSubmit = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }
    // Handle login or register logic here
    console.log('Formulário enviado', { name, email, password })
  }

  return (
    <div className='flex h-screen'>
      {/* Lado esquerdo (2/3) */}
      <div
        className={`relative w-2/3 bg-purple flex flex-col justify-center items-center p-8 transition-transform duration-500 ${
          isLogin ? 'translate-x-0' : '-translate-x-full'
        }`} // Transição suave para o lado esquerdo
      >
        <div
          onClick={() => setIsLogin(false)} // Quando clicar em "Cadastre-se", alterna para o formulário de cadastro
          className='absolute flex top-6 right-6 cursor-pointer'
        >
          <p className='text-white'>
            Ainda não tem uma conta? Cadastre-se!
          </p>
        </div>
        <div className='text-center'>
          <Image
            src='/icons/logo_marcado.png'
            alt='Logo'
            width={96}
            height={96}
            className='w-24 mx-auto mb-4'
          />
          <h1 className='text-2xl font-semibold flex items-center justify-center'>
            Bem-vind@ à Mirumuh!
          </h1>
          <p className='text-white'>
            Insira seus dados para acessar sua conta
          </p>
        </div>
        <form onSubmit={handleSubmit} className='mt-6 w-full max-w-sm'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full p-3 mb-3 border rounded-lg'
          />
          <input
            type='password'
            placeholder='Senha'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full p-3 mb-3 border rounded-lg'
          />
          <div className='flex justify-center items-center'>
            <Button label='Entrar' variant={'brown'}></Button>
          </div>
        </form>
      </div>

      {/* Lado direito (2/3) - o lado que contém o cadastro */}
      <div
        className={`relative w-2/3 bg-pink flex flex-col justify-center items-center p-8 transition-transform duration-500 ${
          !isLogin ? 'translate-x-0' : 'translate-x-full'
        }`} // Transição suave para o lado direito
      >
        <div
          onClick={() => setIsLogin(true)} // Quando clicar em "Já tem conta?", alterna para o formulário de login
          className='absolute flex top-6 left-6 cursor-pointer'
        >
          <p className='text-black'>
            Já tem uma conta? Entre aqui!
          </p>
        </div>
        <div className='text-center'>
          <Image
            src='/icons/logo_marcado.png'
            alt='Logo'
            width={96}
            height={96}
            className='w-24 mx-auto mb-4'
          />
          <h1 className='text-2xl font-semibold'>
            Cadastre-se na Mirumuh!
          </h1>
          <p className='text-black'>
            Insira seus dados para criar uma nova conta
          </p>
        </div>
        <form onSubmit={handleSubmit} className='mt-6 w-full max-w-sm'>
          <input
            type='text'
            placeholder='Nome'
            value={name}
            onChange={e => setName(e.target.value)}
            className='w-full p-3 mb-3 border rounded-lg'
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full p-3 mb-3 border rounded-lg'
          />
          <input
            type='password'
            placeholder='Senha'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full p-3 mb-3 border rounded-lg'
          />
          <input
            type='password'
            placeholder='Confirmar Senha'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className='w-full p-3 mb-3 border rounded-lg'
          />
          <div className='flex justify-center items-center'>
            <Button label='Cadastrar' variant={'brown'}></Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
