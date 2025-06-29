'use client'
import Button from '../components/Button'
import getUserProfile from '@/services/userInfo'
import { useEffect, useState } from 'react'
import ModalFormularioProduto from '../components/ModalFormularioProduto'
import Image from 'next/image'
import Loading from '../components/Loading'
import getProductsWithPrice from '@/services/Products/getProducts'
import softDeleteProduct from '@/services/Products/deleteProduct'
import Switch from '../components/Switch'
import editProducts from '@/services/Products/editProducts'
import NumberControl from '../components/NumberControl'
import ModalSenha from '../components/ModalSenha'

const ContaPage = () => {
  const is_carol = process.env.NEXT_PUBLIC_IS_CAROL
  const [user, setUser] = useState({})
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  const [loading, setLoading] = useState(false)
  const [loadingProdutos, setLoadingProdutos] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openModalEditar, setOpenModalEditar] = useState(false)
  const [openModalAlterarSenha, setOpenModalAlterarSenha] = useState(false)
  const [pedidos, setPedidos] = useState([])
  const [produtos, setProdutos] = useState([])
  const [idProduct, setIdProduct] = useState('')

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  const handleModalEditar = id => {
    setOpenModalEditar(!openModalEditar)
    setIdProduct(id)
  }

  const categories = [
    { id: 1, name: 'TODOS', value: 'all' },
    { id: 2, name: 'RECEITAS', value: 'receita' },
    { id: 3, name: 'AMIGURUMIS', value: 'amigurumi' },
    { id: 4, name: 'PINTURAS', value: 'pintura' },
  ]

  const fetchAllProduto = async () => {
    setLoadingProdutos(true)
    try {
      const response = await getProductsWithPrice()
      const filteredProducts = response.filter(product => product.active)
      setProdutos(filteredProducts)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoadingProdutos(false)
    }
  }

  const fetchProdutoByCategory = async category => {
    setLoadingProdutos(true)
    try {
      const response = await getProductsWithPrice(category)
      const filteredProducts = response.filter(product => product.active)
      setProdutos(filteredProducts)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoadingProdutos(false)
    }
  }

  const deleteProduto = async id => {
    setLoadingProdutos(true)
    try {
      const response = await softDeleteProduct(id)
      if (response) {
        const updatedProducts = produtos.filter(
          produto => produto.id !== id
        )
        setProdutos(updatedProducts)
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoadingProdutos(false)
    }
  }
  const handleDelete = id => {
    const confirmDelete = window.confirm(
      'Você tem certeza que deseja excluir este produto?'
    )

    if (confirmDelete) {
      deleteProduto(id)
    }
  }

  useEffect(() => {
    if (role === is_carol) {
      if (selectedTab === 'all') {
        fetchAllProduto()
      } else {
        fetchProdutoByCategory(selectedTab)
      }
    }
  }, [is_carol, role, selectedTab])

  const atualizarProdutos = () => {
    if (selectedTab === 'all') {
      fetchAllProduto()
    } else {
      fetchProdutoByCategory(selectedTab)
    }
  }

  useEffect(() => {
    if (role !== is_carol) {
      setPedidos(user.orders)
    }
  }, [is_carol, role, user])

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    setTimeout(() => {
      window.location.href = '/login'
    }, 500)
  }

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true)
      try {
        const data = await getUserProfile()
        setRole(data.role)
        setUser(data.user)
      } catch (error) {
        setError('Não foi possível carregar os dados do usuário!')
      } finally {
        setLoading(false)
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

  const formatarDataBR = dataISO => {
    if (!dataISO) return ''
    const data = new Date(dataISO)
    if (isNaN(data)) return dataISO
    return data.toLocaleDateString('pt-BR')
  }

  // --- FUNÇÃO CORRIGIDA ---
  const handleToggle = async (state, id) => {
    const produto = produtos.find(p => p.id === id)
    if (!produto) return

    // 1. Cria o objeto de metadados final
    const newMetadata = {
      ...produto.metadata,
      pinturaAtiva: state ? 'true' : 'false',
    }

    const formData = new FormData()

    // 2. Itera sobre o objeto final e adiciona ao FormData.
    // Isso garante que cada chave seja adicionada apenas uma vez.
    Object.keys(newMetadata).forEach(key => {
      formData.append(`metadata[${key}]`, newMetadata[key])
    })

    try {
      const response = await editProducts(id, formData)

      if (response) {
        const updatedProducts = produtos.map(p =>
          p.id === id ? { ...p, metadata: newMetadata } : p
        )
        setProdutos(updatedProducts)
      }
    } catch (error) {
      console.error('Erro ao atualizar o toggle:', error)
      alert('Não foi possível atualizar o status do produto.')
    }
  }

  // --- FUNÇÃO CORRIGIDA ---
  const handleNumber = async (id, value) => {
    const produto = produtos.find(p => p.id === id)
    if (!produto) return

    // 1. Cria o objeto de metadados final
    const newMetadata = {
      ...produto.metadata,
      quantidade: String(value),
    }

    const formData = new FormData()

    // 2. Itera sobre o objeto final para garantir que não haja chaves duplicadas
    Object.keys(newMetadata).forEach(key => {
      formData.append(`metadata[${key}]`, newMetadata[key])
    })

    try {
      const response = await editProducts(id, formData)
      if (response) {
        const updatedProducts = produtos.map(p =>
          p.id === id ? { ...p, metadata: newMetadata } : p
        )
        setProdutos(updatedProducts)
      }
    } catch (error) {
      console.error('Erro ao atualizar a quantidade:', error)
      alert('Não foi possível atualizar a quantidade.')
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                  <div className='flex w-full justify-end md:flex-row flex-col gap-4'>
                    <Button
                      label='Sair da Conta'
                      variant={'brown'}
                      onClick={handleLogout}
                    ></Button>
                  </div>
                </div>
              </div>

              {role === is_carol ? (
                <div className='bg-white rounded-3xl shadow-lg mt-6 w-full'>
                  <div className='bg-blue p-3 rounded-t-3xl'>
                    <h2 className='text-lg font-bold text-brown pl-2'>
                      MEUS PRODUTOS
                    </h2>
                  </div>

                  <div className='p-4 sm:p-6'>
                    {/* Tabs de categoria */}
                    <div className='flex gap-2 sm:gap-4 mb-4 overflow-x-auto scrollbar-thin'>
                      {categories.map(tab => (
                        <button
                          key={tab.value}
                          className={`px-3 sm:px-4 py-2 rounded whitespace-nowrap transition ${
                            selectedTab === tab.value
                              ? 'border-b-4 border-blue text-blue font-semibold'
                              : 'bg-white text-gray-700'
                          }`}
                          onClick={() => setSelectedTab(tab.value)}
                        >
                          {tab.name}
                        </button>
                      ))}
                      <button
                        className='bg-blue text-brown px-3 sm:px-4 py-2 rounded font-bold'
                        onClick={handleModal}
                      >
                        +
                      </button>
                    </div>

                    {/* Lista de produtos */}
                    {loadingProdutos ? (
                      <Loading />
                    ) : produtos?.length ? (
                      produtos
                        .filter(
                          produto =>
                            selectedTab === 'all' ||
                            produto.metadata.tipo === selectedTab
                        )
                        .map(produto => {
                          const tipo = produto.metadata.tipo
                          const tipoPintura = produto.metadata.tipoPintura
                          const isPrint =
                            tipo === 'pintura' && tipoPintura === 'print'

                          return (
                            <div
                              key={produto.id}
                              className='border border-blue rounded-2xl p-4 mb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'
                            >
                              <div className='flex flex-col sm:flex-row sm:items-center sm:gap-3'>
                                <p className='truncate sm:max-w-xs font-medium text-gray-800'>
                                  {produto.name}
                                </p>

                                {tipo === 'pintura' && tipoPintura && (
                                  <span className='text-xs text-white bg-secondary px-2 py-1 rounded-md mt-1 sm:mt-0 sm:ml-2'>
                                    {tipoPintura}
                                  </span>
                                )}
                              </div>

                              <div className='flex flex-wrap justify-end sm:justify-normal gap-4 items-center'>
                                {/* Caso pintura com tipoPintura print: mostrar contador + switch */}
                                {isPrint ? (
                                  <>
                                    <NumberControl
                                      value={
                                        Number(
                                          produto.metadata.quantidade
                                        ) || 0
                                      }
                                      onChange={value =>
                                        handleNumber(produto.id, value)
                                      }
                                      min={0}
                                    />
                                    <Switch
                                      onToggle={state =>
                                        handleToggle(state, produto.id)
                                      }
                                      value={
                                        produto.metadata.pinturaAtiva ===
                                        'true'
                                      }
                                    />
                                  </>
                                ) : tipo === 'pintura' ? (
                                  <Switch
                                    onToggle={state =>
                                      handleToggle(state, produto.id)
                                    }
                                    value={
                                      produto.metadata.pinturaAtiva ===
                                      'true'
                                    }
                                  />
                                ) : tipo === 'amigurumi' ? (
                                  <NumberControl
                                    value={
                                      Number(
                                        produto.metadata.quantidade
                                      ) || 0
                                    }
                                    onChange={value =>
                                      handleNumber(produto.id, value)
                                    }
                                    min={0}
                                  />
                                ) : null}

                                <button
                                  className='text-brown'
                                  onClick={() => handleDelete(produto.id)}
                                >
                                  <Image
                                    src='/icons/excluir.svg'
                                    alt='Excluir'
                                    className='w-5 h-5'
                                    width={20}
                                    height={20}
                                  />
                                </button>

                                <button
                                  className='text-blue-500'
                                  onClick={() =>
                                    handleModalEditar(produto.id)
                                  }
                                >
                                  <Image
                                    src='/icons/editar.svg'
                                    alt='Editar'
                                    className='w-5 h-5'
                                    width={20}
                                    height={20}
                                  />
                                </button>
                              </div>
                            </div>
                          )
                        })
                    ) : (
                      <p className='text-center text-gray-500'>
                        Nenhum produto encontrado.
                      </p>
                    )}
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
                    {pedidos?.length ? (
                      pedidos?.map((pedido, index) => (
                        <div
                          key={index}
                          className='border border-blue rounded-2xl p-4 mb-3'
                        >
                          <div className='flex justify-between items-center md:flex-row flex-col gap-4'>
                            <p>
                              <span className='font-semibold'>
                                {pedido.items[0].description}
                              </span>{' '}
                              - {formatarDataBR(pedido.created_at)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className='text-center text-gray-500'>
                        Você ainda não possui pedidos.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {openModal && (
            <ModalFormularioProduto
              closeModal={handleModal}
              atualizarProdutos={atualizarProdutos}
            />
          )}
          {openModalEditar && (
            <ModalFormularioProduto
              closeModal={handleModalEditar}
              idProduct={idProduct}
              atualizarProdutos={atualizarProdutos}
            />
          )}
          {openModalAlterarSenha && (
            <ModalSenha
              isOpen={openModalAlterarSenha}
              onClose={() => setOpenModalAlterarSenha(false)}
            />
          )}
        </div>
      )}
    </>
  )
}

export default ContaPage
