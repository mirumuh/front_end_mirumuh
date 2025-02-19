import Image from 'next/image'
import Button from './Button'

const GridProducts = ({ product }) => {
  return (
    <div className='flex flex-col gap-4 bg-white rounded-3xl shadow-lg p-10 items-center'>
      <div className='flex items-center justify-center border rounded-2xl w-full p-1 sm:h-56 overflow-hidden'>
        <Image
          src={product?.images[0] || '/icons/logo_marcado.png'}
          alt='Imagem da Receita'
          width={100}
          height={100}
          style={
            product?.images[0]
              ? {
                  transform: 'scale(2)',
                  objectFit: 'fill',
                  transformOrigin: 'center 70% 20px',
                }
              : {}
          }
        />
      </div>

      <div className='flex flex-col gap-2 items-center'>
        <h2 className=' text-lg text-light-brown '>
          {product?.name || 'Teste product'}{' '}
        </h2>
        <p className='font-semibold'>
          R$ {(product?.prices[0].amount / 100).toFixed(2)}
        </p>
      </div>

      <Button
        label='Encomendar'
        variant={'brown'}
        onClick={
          console.log('oi')
          // onClick={onClickBuy};
        }
      />
    </div>
  )
}

export default GridProducts
