import React from 'react'

const SelectComponent = ({ value, setValue, options, label }) => {
  return (
    <div className='flex flex-col gap-2'>
      <span className='font-semibold text-sm text-dark-purple'>
        {label}
      </span>
      <select
        className='border border-gray-300 rounded p-2 w-full appearance-none text-[14px]'
        style={{
          backgroundImage: 'url("/icons/arrow.svg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1.5rem',
        }}
        value={value}
        onChange={e => setValue(e.target.value)}
      >
        <option value='' disabled className='text-gray-50'>
          Selecione uma opção
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectComponent
