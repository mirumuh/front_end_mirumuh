'use client'

import React from 'react';

const Switch = ({ onToggle, value }) => {
  const isEnabled = value === true;

  const toggle = () => {
    onToggle?.(!isEnabled);
  };

  return (
    <div className='flex items-center gap-3'>
      <span className='text-sm'>Ativo para venda:</span>
      <button
        onClick={toggle}
        className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
          isEnabled ? 'bg-secondary' : 'bg-primary bg-opacity-40'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isEnabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default Switch;