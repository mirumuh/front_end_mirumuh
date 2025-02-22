import React, { useState } from 'react'

const PdfUploader = ({ label, onPdfUpload, maxSizeMB = 15 }) => {
  const [pdfFile, setPdfFile] = useState(null)

  const handleFileChange = e => {
    const file = e.target.files[0]

    if (!file) return
    if (file.type !== 'application/pdf') {
      alert('Por favor, selecione um arquivo PDF.')
      return
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`O arquivo deve ter no máximo ${maxSizeMB}MB.`)
      return
    }

    setPdfFile(file)
    if (onPdfUpload) {
      onPdfUpload(file)
    }
  }

  const removeFile = () => {
    setPdfFile(null)
    if (onPdfUpload) {
      onPdfUpload(null)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <span className='font-semibold text-sm text-dark-purple'>
        {label}
      </span>

      <label className=' shadow-sm rounded p-2 w-full flex items-center justify-center cursor-pointer text-dark-purple bg-blue hover:bg-light-darker-blue text-[14px]'>
        <input
          type='file'
          accept='application/pdf'
          onChange={handleFileChange}
          className='hidden'
        />
        Selecione um PDF (Máx: {maxSizeMB}MB)
      </label>

      {pdfFile && (
        <div className='mt-2 flex items-center justify-between border border-gray-300 rounded p-2'>
          <span className='truncate w-full'>{pdfFile.name}</span>
          <button
            onClick={removeFile}
            className='ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

export default PdfUploader
