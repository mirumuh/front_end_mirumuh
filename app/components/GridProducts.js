import Image from 'next/image'
import Link from 'next/link'

const GridProducts = ({
  product,
  buttonLabel,
  buttonColor,
  pinturaAtiva,
}) => {
  return (
    <div className='flex flex-col gap-4 bg-white rounded-3xl shadow-lg p-10 items-center'>
      <div className='flex items-center justify-center border rounded-2xl w-full p-1 h-56 overflow-hidden relative'>
        <Image
          src={product?.images[0] || '/icons/logo_marcado.png'}
          alt='Imagens'
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          className='rounded-2xl'
        />
      </div>

      <div className='flex flex-col gap-2 items-center'>
        <h2 className=' text-lg text-light-brown text-center'>
          {product?.name || 'Teste product'}
        </h2>
        {product.metadata.tipo !== 'pintura' || pinturaAtiva == 'true' ? (
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
        className={`
          ${
            buttonColor === 'green'
              ? 'bg-secondary hover:bg-secondary-hover'
              : 'bg-blue hover:bg-light-darker-blue'
          }
 text-white px-5 py-2 rounded-xl shadow w-min whitespace-nowrap
`}
      >
        {buttonLabel}
      </Link>
    </div>
  )
}

export default GridProducts
