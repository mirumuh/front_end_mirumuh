'use client'
import Receita from '../components/Receita'

const Receitas = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-10 w-fuFll px-40 py-20 overflow-y-auto max-h-screenHeader'>
        <Receita />
        <Receita />
        <Receita />
        <Receita />
        <Receita />
        <Receita />
      </div>
    </div>
  )
}

export default Receitas
