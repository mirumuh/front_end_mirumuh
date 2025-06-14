import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const BackButton = ({ urlBack }) => {
  const router = useRouter()
  const handleBack = () => {
    if (urlBack) {
      window.location = urlBack
      return
    }
    router.back()
  }
  return (
    <button
      className='self-start flex gap-2 items-center cursor-pointer'
      onClick={handleBack}
    >
      <Image src='/icons/arrow.png' alt='Voltar' width={30} height={30} />
      <span className='uppercase font-semibold text-sm hover:underline underline-offset-4'>
        voltar
      </span>
    </button>
  )
}

export default BackButton
