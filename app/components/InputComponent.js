import React from 'react'

const InputComponent = ({ value, setValue, type, placeholder, label }) => {
  // Função para formatar o valor como moeda brasileira (R$)
  const formatCurrency = value => {
    const numericValue = value.replace(/\D/g, '') // Remove tudo que não for número
    const floatValue = parseFloat(numericValue) / 100 // Divide por 100 para centavos
    if (isNaN(floatValue)) return '' // Se for inválido, retorna vazio
    return floatValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const handleChange = e => {
    if (type === 'preco') {
      const formattedValue = formatCurrency(e.target.value)
      setValue(formattedValue)
    } else {
      setValue(e.target.value)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <span className='font-semibold text-sm text-dark-purple'>
        {label}
      </span>
      <input
        type={type === 'preco' ? 'text' : type} // Define como text para evitar problemas com type="number"
        value={value}
        required
        placeholder={placeholder}
        onChange={handleChange}
        className='border border-gray-300 rounded p-2 w-full text-[14px] '
      />
    </div>
  )
}

export default InputComponent
