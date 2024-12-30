'use client'
import Receita from '../components/Receita'
import { mockDataReceitas } from '../services/receitasData'

const Receitas = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-10 w-fuFll px-40 py-20 overflow-y-auto max-h-screenHeader'>
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
