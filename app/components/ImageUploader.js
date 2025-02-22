import Image from 'next/image'
import React, { useState } from 'react'

const MultiImageUploader = ({
  label,
  onImagesUpload,
  maxImages = 8,
  maxSizeMB = 2,
}) => {
  const [images, setImages] = useState([])

  const handleFileChange = e => {
    const files = Array.from(e.target.files)

    // Filtra as imagens que respeitam o tamanho e o limite de quantidade
    const validImages = files
      .filter(file => file.size <= maxSizeMB * 1024 * 1024)
      .slice(0, maxImages - images.length)

    if (validImages.length === 0) {
      alert(
        `Selecione imagens menores que ${maxSizeMB}MB e até ${maxImages} no total.`
      )
      return
    }

    const newImages = validImages.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    const updatedImages = [...images, ...newImages].slice(0, maxImages)
    setImages(updatedImages)

    if (onImagesUpload) {
      onImagesUpload(updatedImages.map(img => img.file))
    }
  }

  const removeImage = index => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)

    if (onImagesUpload) {
      onImagesUpload(updatedImages.map(img => img.file))
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <span className='font-semibold text-sm text-dark-purple'>
        {label}
      </span>

      <label className=' shadow rounded p-2 w-full flex items-center justify-center cursor-pointer text-dark-purple bg-blue hover:bg-light-darker-blue text-[14px]'>
        <input
          type='file'
          accept='image/*'
          multiple
          onChange={handleFileChange}
          className='hidden'
        />
        Selecione até {maxImages} imagens (Máx: {maxSizeMB}MB cada)
      </label>

      <div className='grid grid-cols-4 gap-2 mt-2'>
        {images.map((img, index) => (
          <div key={index} className='relative'>
            <Image
              src={img.preview}
              alt={`Imagem ${index + 1}`}
              className='rounded-lg w-full h-24 object-cover border border-gray-300'
              width={300}
              height={300}
            />
            <button
              onClick={() => removeImage(index)}
              className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiImageUploader
