'use client'
import Receita from '../components/Receita'
import { mockDataReceitas } from '../../services/receitasData'

const Receitas = () => {
  return (
    <div className='w-full h-screenHeader overflow-y-auto'>
      <div className='flex flex-col gap-5 px-5 py-5 sm:py-10 md:px-20 lg:px-40 lg:py-14'>
        {mockDataReceitas.map(receita => (
          <Receita
            key={receita.idReceita}
            idReceita={receita.idReceita}
            nomeReceita={receita.nomeReceita}
            descricaoReceita={receita.descricaoReceita}
            image={receita.arrayImagens}
          />
        ))}
      </div>
    </div>
  )
}

export default Receitas
