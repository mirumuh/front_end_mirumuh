'use client'
import Button from '../components/Button'

const ContaPage = () => {

    const pedidos = [
        { id: 1111, data: '06/02/2024', detalhes: 'teste' },
        { id: 1112, data: '07/02/2024', detalhes: 'testindo' },
        { id: 1113, data: '08/02/2024', detalhes: 'TESTE' },
      ]

      return (
        <div className='p-6 max-w-5xl mx-auto'>
          <div className='bg-white rounded-3xl shadow-lg'>
            <div className='bg-blue p-3 rounded-t-lg'>
              <h2 className='text-lg font-bold text-brown pl-2'>MINHA CONTA</h2>
            </div>
            <div className='p-6'>
              <p className='font-semibold'>Informações de Contato</p>
              <p className='py-2'>Nome do Usuário</p>
              <p className='text-brown pb-4'>email@exemplo.com</p>
              <Button label='Alterar senha' variant={'pink'}></Button>
            </div>
          </div>

          <div className='bg-white rounded-3xl shadow-lg mt-6'>
            <div className='bg-blue p-3 rounded-t-lg'>
              <h2 className='text-lg font-bold text-brown pl-2'>MEUS PEDIDOS</h2>
            </div>
            <div className='p-6'>
              {pedidos.map(pedido => (
                <div key={pedido.id} className='border border-blue rounded-2xl p-4 mb-3'>
                  <div className='flex justify-between items-center'>
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
        </div>
      )
}

export default ContaPage
