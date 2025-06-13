import Image from 'next/image'

const ModalSenha = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg shadow-lg p-6 w-full sm:w-50 md:w-2/5 relative'
        onClick={e => e.stopPropagation()}
      >
        <h2 className='text-brown font-semibold text-center text-[22px] px-8'>
          Alterar Senha
        </h2>

        <p className='text-brown text-justify p-2 mt-4'>
          Para alterar sua senha, por favor, entre em contato comigo pelo
          WhatsApp. Assim poderei te ajudar com o processo de alteração de
          senha.
        </p>
      </div>
    </div>
  )
}

export default ModalSenha
