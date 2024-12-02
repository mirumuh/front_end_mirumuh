import Image from 'next/image'
import Button from '../components/Button'

const Produtos = () => {
  return (
    <div className='flex justify-between items-center px-60 pt-14 pb-16 w-full gap-20 '>
      <div className='flex flex-col w-1/2 gap-16'>
        <div className='bg-white w-full rounded-lg h-96 shadow-lg '>
          <div className='flex justify-center p-3'>
            <Image
              src='/icons/iconMirumuh_topRosa_marrom.png'
              alt='Imagem da Receita'
              width={300}
              height={300}
              className='rounded-2xl'
            />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-16'>
          <div className='bg-white w-full rounded-lg h-32 shadow-lg'>
            <div className='flex justify-center p-3'>
              <Image
                src='/icons/iconMirumuh_topRosa_marrom.png'
                alt='Imagem da Receita'
                width={100}
                height={100}
                className='rounded-2xl'
              />
            </div>
          </div>
          <div className='bg-white w-full rounded-lg shadow-lg'>
            <div className='flex justify-center p-3'>
              <Image
                src='/icons/iconMirumuh_topRosa_marrom.png'
                alt='Imagem da Receita'
                width={100}
                height={100}
                className='rounded-2xl'
              />
            </div>
          </div>
          <div className='bg-white w-full rounded-lg shadow-lg'>
            <div className='flex justify-center p-3'>
              <Image
                src='/icons/iconMirumuh_topRosa_marrom.png'
                alt='Imagem da Receita'
                width={100}
                height={100}
                className='rounded-2xl'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-5 p-5 bg-white shadow-lg w-1/2 min-h-144 rounded-lg'>
        <div className='self-start'>voltar</div>
        <div className='flex flex-col justify-center items-center gap-10'>
          <div className='flex flex-col gap-8'>
            <span className='font-bold text-3xl'>Receita Teste 1 </span>
            <span>Descrição teste receit 1</span>
            <span>R$ 100,00</span>
          </div>

          <Button label='Comprar' variant={'brown'} />
        </div>
      </div>
    </div>
  )
}

export default Produtos
