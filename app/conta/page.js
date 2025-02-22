'use client'
import Button from '../components/Button'
import getUserProfile from '@/services/userInfo'
import { useEffect, useState } from 'react'
import ModalFormularioProduto from '../components/ModalFormularioProduto'

const ContaPage = () => {
  const [user, setUser] = useState({})
  const [error, setError] = useState('')
  const [selectedTab, setSelectedTab] = useState('TODOS')
  const [openModal, setOpenModal] = useState(true)

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  const pedidos = [
    { id: 1111, data: '06/02/2024', detalhes: 'teste' },
    { id: 1112, data: '07/02/2024', detalhes: 'testindo' },
    { id: 1113, data: '08/02/2024', detalhes: 'TESTE' },
  ]

  const produtos = [
    { id: 1, nome: 'PTBR - Coelho Dragão' },
    { id: 2, nome: 'US - Dragon Rabbit' },
    { id: 3, nome: 'PTBR - Coelho Gélido Natalino' },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    window.location.href = '/login'
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getUserProfile()
        setUser(data)
      } catch (error) {
        setError('Não foi possível carregar os dados do usuário!')
      }
    }
    getUserData()
  }, [])

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center p-24'>
        <div className='bg-white rounded-3xl shadow-lg w-80 p-6'>
          <p className='text-center'>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      <div className='flex flex-col gap-5 px-5 py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14'>
        <div className='p-6 w-full mx-auto'>
          <div className='bg-white rounded-3xl shadow-lg'>
            <div className='bg-blue p-3 rounded-t-lg'>
              <h2 className='text-lg font-bold text-brown pl-2'>
                MINHA CONTA
              </h2>
            </div>
            <div className='p-6'>
              <p className='font-semibold'>Informações de Contato</p>
              <p className='py-2'>{user?.name}</p>
              <p className='text-brown pb-4'>{user?.email}</p>
              <div className='flex w-full justify-between md:flex-row flex-col gap-4'>
                <Button label='Alterar Senha' variant={'pink'}></Button>
                <Button
                  label='Sair da Conta'
                  variant={'brown'}
                  onClick={handleLogout}
                ></Button>
              </div>
            </div>
          </div>

          {user?.email === 'teste@gmail.com' ? (
            <div className='bg-white rounded-3xl shadow-lg mt-6'>
              <div className='bg-blue p-3 rounded-t-lg'>
                <h2 className='text-lg font-bold text-brown pl-2'>
                  MEUS PRODUTOS
                </h2>
              </div>
              <div className='p-6'>
                <div className='flex gap-4 mb-4'>
                  {['TODOS', 'RECEITAS', 'AMIGURUMI', 'PINTURAS'].map(
                    tab => (
                      <button
                        key={tab}
                        className={`px-4 py-2 rounded relative ${
                          selectedTab === tab
                            ? 'border-b-4 border-blue'
                            : 'bg-white'
                        }`}
                        onClick={() => setSelectedTab(tab)}
                      >
                        {tab}
                      </button>
                    )
                  )}
                  <button
                    className='bg-blue text-brown px-4 py-2 rounded'
                    onClick={handleModal}
                  >
                    +
                  </button>
                </div>
                {produtos
                  .filter(
                    produto =>
                      selectedTab === 'TODOS' ||
                      produto.categoria === selectedTab
                  )
                  .map(produto => (
                    <div
                      key={produto.id}
                      className='border border-blue rounded-2xl p-4 mb-3 flex justify-between items-center'
                    >
                      <p>{produto.nome}</p>
                      <div className='flex gap-4 '>
                        <button className='text-brown'>
                          <img
                            src='/icons/excluir.svg'
                            alt='Excluir'
                            className='w-5 h-5'
                          />
                        </button>
                        <button className='text-blue-500'>
                          <img
                            src='/icons/editar.svg'
                            alt='Editar'
                            className='w-5 h-5'
                          />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className='bg-white rounded-3xl shadow-lg mt-6'>
              <div className='bg-blue p-3 rounded-t-lg'>
                <h2 className='text-lg font-bold text-brown pl-2'>
                  MEUS PEDIDOS
                </h2>
              </div>
              <div className='p-6'>
                {pedidos.map(pedido => (
                  <div
                    key={pedido.id}
                    className='border border-blue rounded-2xl p-4 mb-3'
                  >
                    <div className='flex justify-between items-center md:flex-row flex-col gap-4'>
                      <p>
                        <span className='font-semibold'>
                          Pedido #{pedido.id}
                        </span>{' '}
                        - Data {pedido.data}
                      </p>
                      <Button
                        label='Ver detalhes'
                        variant={'pink'}
                      ></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {openModal && <ModalFormularioProduto closeModal={handleModal} />}
    </div>
  )
}

export default ContaPage
