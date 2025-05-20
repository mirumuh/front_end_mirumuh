import React, { useState } from 'react'

const Switch = ({ onToggle, value }) => {
  const [enabled, setEnabled] = useState(value)

  const toggle = () => {
    const newState = !enabled
    setEnabled(newState)
    onToggle?.(newState)
  }

  return (
    <div className='flex items-center gap-3'>
      <span className='text-sm'>Ativo para venda:</span>
      <button
        onClick={toggle}
        className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
          enabled ? 'bg-secondary' : 'bg-primary bg-opacity-40'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

export default Switch
