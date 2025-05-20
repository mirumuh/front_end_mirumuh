import Image from 'next/image'
import Link from 'next/link'

const GridProducts = ({ product, buttonLabel, pinturaAtiva }) => {
  return (
    <div className='flex flex-col gap-4 bg-white rounded-3xl shadow-lg p-10 items-center'>
      <div className='flex items-center justify-center border rounded-2xl w-full p-1 sm:h-56 overflow-hidden'>
        <Image
          src={product?.images[0] || '/icons/logo_marcado.png'}
          alt='Imagens'
          width={100}
          height={100}
          style={
            product?.images[0]
              ? {
                  transform: 'scale(2)',
                  objectFit: 'fill',
                  transformOrigin: 'center 50% 20px',
                }
              : {}
          }
        />
      </div>

      <div className='flex flex-col gap-2 items-center'>
        <h2 className=' text-lg text-light-brown '>
          {product?.name || 'Teste product'}{' '}
        </h2>
        {pinturaAtiva == 'true' ? (
          <p className='font-semibold'>
            R$ {(product?.prices[0].amount / 100).toFixed(2)}
          </p>
        ) : (
          <p className='font-semibold'>Vendido</p>
        )}
      </div>

      <Link
        href={{
          pathname: `/produtos/${product?.id}`,
          query: { produto: JSON.stringify(product) },
        }}
        className='bg-blue hover:bg-light-darker-blue text-white px-5 py-2 rounded-xl shadow w-min whitespace-nowrap'
      >
        {buttonLabel}
      </Link>
    </div>
  )
}

export default GridProducts
