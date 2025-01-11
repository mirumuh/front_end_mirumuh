import React, { useState } from 'react'

const LanguageSwitcher = ({ setLanguage, language }) => {
  const handleLanguageChange = e => {
    setLanguage(e.target.value)
  }

  return (
    <div>
      {/* Dropdown para selecionar o idioma */}
      <div className='mb-4 flex flex-col gap-5'>
        <label htmlFor='language' className='font-semibold'>
          Escolha o idioma do PDF / Choose a language for the PDF:
        </label>
        <select
          id='language'
          value={language}
          onChange={handleLanguageChange}
          className='border rounded p-2'
        >
          <option value='pt-br'>Português</option>
          <option value='eng'>English</option>
        </select>
      </div>
    </div>
  )
}

export default LanguageSwitcher
