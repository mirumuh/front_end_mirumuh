import React, { useState } from 'react'

const LanguageSwitcher = ({ setLanguage, language }) => {
  const handleLanguageChange = e => {
    setLanguage(e.target.value)
  }

  return (
    <div>
      {/* Dropdown para selecionar o idioma */}
      <div className='mb-4'>
        <label htmlFor='language' className='mr-2 '>
          Escolha o idioma / Choose a language:
        </label>
        <select
          id='language'
          value={language}
          onChange={handleLanguageChange}
          className='border rounded px-2 py-1'
        >
          <option value='pt-br'>Português</option>
          <option value='eng'>English</option>
        </select>
      </div>
    </div>
  )
}

export default LanguageSwitcher
