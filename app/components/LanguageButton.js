import React from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

const LanguageButton = () => {
  const { toggleLanguage } = useLanguage()

  return (
    <button onClick={toggleLanguage} className='flex items-center gap-2'>
      <span>Traduzir</span>
    </button>
  )
}

export default LanguageButton
