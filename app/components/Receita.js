import Image from 'next/image'
import Link from 'next/link'

const Receita = ({ image, idReceita, nomeReceita, descricaoReceita }) => {
  return (
    <div className='flex flex-col gap-3 bg-white rounded-3xl shadow-lg p-4 sm:flex-row sm:gap-5 sm:items-center sm:py-5'>
      <div className='flex items-center justify-center border border-blue rounded-2xl w-full h-32 sm:w-32 sm:h-32'>
        <Image
          src={image[0]}
          alt='Imagem da Receita'
          width={100}
          height={100}
          className='rounded-2xl'
        />
      </div>

      <div className='flex flex-col gap-1 border border-blue rounded-2xl p-3 w-full  overflow-hidden sm:h-32'>
        <h2 className='font-semibold text-sm sm:text-base'>
          {nomeReceita}
        </h2>
        <p className='text-sm sm:text-base text-gray-700'>
          {descricaoReceita}
        </p>
      </div>

      <Link
        href={`/produtos/${idReceita}`}
        className='bg-blue hover:bg-light-darker-blue text-white px-5 py-2 rounded-xl shadow w-min whitespace-nowrap'
      >
        Ver Receita
      </Link>
    </div>
  )
}

export default Receita
