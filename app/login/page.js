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
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleCadastrar = async e => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage('')

    const validationErrors = {}

    if (!name) validationErrors.name = 'O nome é obrigatório.'
    if (!email) validationErrors.email = 'O email é obrigatório.'
    if (!birthdate) validationErrors.birthdate = 'A data de nascimento é obrigatória.'
    if (!password) validationErrors.password = 'A senha é obrigatória.'
    if (password !== confirmPassword) {
      validationErrors.password = 'As senhas não coincidem.'
      validationErrors.confirmPassword = 'As senhas não coincidem.'
    }

    // Se houver erros de validação, retorna e não faz a requisição de cadastro
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      //verificacao de usuario aqui algum dia
      const response = await register({ email, password, name, birthdate })
      if (response) {
        setSuccessMessage('Usuário cadastrado com sucesso!')
        setTimeout(() => {
          setIsLogin(true)
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setName('')
          setBirthdate('')
          setSuccessMessage('')
        }, 2000)
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async e => {
    e.preventDefault()

    const validationErrors = {}

    if (!email) validationErrors.email = 'O email é obrigatório.'
    if (!password) validationErrors.password = 'A senha é obrigatória.'

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await login(email, password)

      if (response) {
        sessionStorage.setItem('token', response.token)
        window.location.href = '/home'
      }
    } catch (error) {
      if (error.response.status === 404) {
        setErrors({ email: 'Usuário não encontrado!' })
      } else if (error.response.status === 401) {
        setErrors({ password: 'Senha inválida!' })
        setPassword('') // Limpa o campo senha
      }
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
          {/* Lado esquerdo - Login */}
          <div
            className={`relative w-2/3 bg-purple flex flex-col justify-center items-center p-8 transition-transform duration-500 ${
              isLogin ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div
              onClick={() => setIsLogin(false)}
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
              <h1 className='text-2xl font-semibold'>
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
                className={`w-full p-3 mb-1 border rounded-lg ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email}</p>
              )}
              <input
                type='password'
                placeholder='Senha'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full p-3 mb-1 border rounded-lg ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>{errors.password}</p>
              )}
              <div className='flex justify-center items-center'>
                <Button label='Entrar' variant='brown' type='submit' />
              </div>
            </form>
          </div>

          {/* Lado direito - Cadastro */}
          <div
            className={`relative w-2/3 bg-pink flex flex-col justify-center items-center p-8 transition-transform duration-500 ${
              !isLogin ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div
              onClick={() => setIsLogin(true)}
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
                className={`w-full p-3 mb-1 border rounded-lg ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name}</p>
              )}
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full p-3 mb-1 border rounded-lg ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email}</p>
              )}
              <input
                type='date'
                value={birthdate}
                onChange={e => setBirthdate(e.target.value)}
                className={`w-full p-3 mb-1 border rounded-lg ${
                  errors.birthdate ? 'border-red-500' : ''
                }`}
              />
              {errors.birthdate && (
                <p className='text-red-500 text-sm'>{errors.birthdate}</p>
              )}
              <input
                type='password'
                placeholder='Senha'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full p-3 mb-1 border rounded-lg ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>{errors.password}</p>
              )}
              <input
                type='password'
                placeholder='Confirmar Senha'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`w-full p-3 mb-1 border rounded-lg ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm'>
                  {errors.confirmPassword}
                </p>
              )}
              <div className='flex justify-center items-center'>
                <Button label='Cadastrar' variant='brown' type='submit' />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage
