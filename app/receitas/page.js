'use client'
import Header from '../components/Header'
import Receita from '../components/Receita'

const Receitas = () => {
  return (
    <div className='min-h-screen w-full'>
      <Header />
      <div className='flex flex-col gap-10 w-full px-40 py-20 overflow-y-auto max-h-screenHeader'>
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
