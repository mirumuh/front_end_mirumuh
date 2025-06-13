import React from 'react'
import Button from './Button'

const NumberControl = ({ value, onChange, min = 1, max }) => {
  const decrease = () => {
    if (value > min) onChange(value - 1)
  }

  const increase = () => {
    onChange(value + 1)
  }

  return (
    <div className='flex items-center gap-4 text-xl font-medium text-gray-800'>
      <Button label='&lt;' onClick={decrease} size={'small'} />

      <span className='min-w-[2ch] text-center'>{value}</span>

      <Button label='&gt;' onClick={increase} size={'small'} />
    </div>
  )
}
export default NumberControl
