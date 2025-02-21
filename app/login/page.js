'use client'
import Button from '../components/Button'
import { useState } from 'react'
import Image from 'next/image'
import login, { register } from '@/services/login'
import Loading from '../components/Loading'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('') // Novo estado para "confirmar senha"
  const [name, setName] = useState('') // Novo estado para "nome"
  const [birthdate, setBirthdate] = useState('') // Novo estado para "data de nascimento"
  const [isLogin, setIsLogin] = useState(true) // Estado para alternar entre login e cadastro
  const [isLoading, setIsLoading] = useState(false)

  const handleCadastrar = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }

    setIsLoading(true)
    try {
      const response = await register({ email, password, name, birthdate })
      if (response) {
        alert('Usuário cadastrado com sucesso! Faça login para continuar.')
        setIsLogin(true)
      }
    } catch (error) {
      if (error.response.status === 409) {
        alert('Usuário já cadastrado!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async e => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const response = await login(email, password)

      if (response) {
        sessionStorage.setItem('token', response.token)
        window.location.href = '/home'
      }
    } catch (error) {
      alert('Verifique suas credenciais e tente novamente!')
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
                Ainda não tem uma conta?{' '}
                <span className='underline font-semibold underline-offset-2'>
                  Cadastre-se!
                </span>
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
            <form
              onSubmit={handleLogin}
              className='mt-6 w-full max-w-sm flex gap-2 flex-col'
            >
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
                <Button label='Entrar' variant={'brown'} type={'submit'} />
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
                Já tem uma conta?{' '}
                <span className='underline font-semibold underline-offset-2'>
                  Entre aqui!
                </span>
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
            <form
              onSubmit={handleCadastrar}
              className='mt-6 w-full max-w-sm flex gap-2 flex-col'
            >
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
                type='date'
                placeholder='Data de Nascimento'
                value={birthdate}
                onChange={e => setBirthdate(e.target.value)}
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
                <Button
                  label='Cadastrar'
                  variant={'brown'}
                  type={'submit'}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage
