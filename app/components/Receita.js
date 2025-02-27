import Image from 'next/image'
import Link from 'next/link'

const Receita = ({ receita }) => {
  return (
    <div className='flex flex-col gap-3 bg-white rounded-3xl shadow-lg p-4 sm:flex-row sm:gap-5 sm:items-center sm:py-5'>
      <div className='flex items-center justify-center border border-blue rounded-2xl w-full p-1 sm:w-32 sm:h-32 overflow-hidden'>
        <img
          src={receita?.images[0] || '/icons/logo_marcado.png'}
          alt='Imagem da Receita'
          width={100}
          height={100}
          style={
            receita?.images[0]
              ? {
                  transform: 'scale(2)',
                  objectFit: 'fill',
                  transformOrigin: 'center 70% 20px',
                }
              : {}
          }
        />
      </div>

      <div className='flex flex-col gap-2 border border-blue rounded-2xl p-3 w-full  overflow-hidden sm:h-32'>
        <h2 className='font-semibold text-sm sm:text-base'>
          {receita?.name}
        </h2>

        <p
          className='text-sm sm:text-base text-gray-700 overflow-hidden text-ellipsis'
          style={{
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {receita?.description}
        </p>
      </div>

      <Link
        href={{
          pathname: `/produtos/${receita?.id}`,
          query: { produto: JSON.stringify(receita) },
        }}
        className='bg-blue hover:bg-light-darker-blue text-white px-5 py-2 rounded-xl shadow w-min whitespace-nowrap'
      >
        Ver Receita
      </Link>
    </div>
  )
}

export default Receita
