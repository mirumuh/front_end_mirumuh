import Image from 'next/image'
import Link from 'next/link'

const Receita = ({ image, linkTo, nomeReceita, descricaoReceita }) => {
  return (
    <div className='flex py-5 items-center px-8 gap-5 bg-white w-full min-h-40 rounded-3xl'>
      <div className='flex border border-blue rounded-2xl p-3 w-32 h-32'>
        <Image
          src='/icons/iconMirumuh_topRosa_marrom.png'
          alt='Imagem da Receita'
          width={100}
          height={100}
          className='rounded-2xl'
        />
      </div>

      <div className='flex flex-col gap-1 h-32 w-5/6 border border-blue p-3 rounded-2xl'>
        <h2 className='font-semibold'>Nome da Receita</h2>
        <p>Descrição da Receita</p>
      </div>
      <Link
        href={'/produtos'}
        className='bg-blue hover:bg-light-darker-blue text-white px-5 py-2 rounded-xl w-min shadow whitespace-nowrap h-min '
      >
        Ver Receita
      </Link>
    </div>
  )
}

export default Receita
