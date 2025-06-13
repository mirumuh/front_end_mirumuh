import React from 'react'

const ModalAjuda = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg shadow-lg p-6 
          w-[90%] h-[70vh] overflow-y-auto
          sm:w-full sm:max-w-2xl sm:h-auto sm:max-h-[80vh]
          relative'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute top-3 right-3 text-brown hover:light-darker-brown'
          onClick={onClose}
          aria-label='Fechar ajuda'
        >
          ✖
        </button>

        <h2 className='text-brown font-semibold text-center text-[20px] sm:text-[22px] px-4 sm:px-8'>
          Ajuda - Dúvidas Comuns
        </h2>

        <div className='text-brown text-justify space-y-4 mt-6 text-sm sm:text-base'>
          <div>
            <strong>Encomendas personalizadas</strong>
            <p>
              Verifique a disponibilidade da agenda e entre em contato
              comigo pelo WhatsApp! Para reservar sua posição na fila basta
              pagar pelo menos 50% do valor acordado da encomenda.
            </p>
          </div>

          <div>
            <strong>Pagamentos</strong>
            <p>
              Para encomendas personalizadas, é necessário pagar ao menos
              50% do valor total e o restante + frete quando a encomenda
              está finalizada e pronta para envio.
            </p>
          </div>

          <div>
            <strong>Valores</strong>
            <p>
              Os valores das encomendas variam conforme tamanho, linha
              usada na confecção, quantidade de cores, acessórios e
              complexidade do amigurumi.
            </p>
          </div>

          <div>
            <strong>Como funcionam as receitas?</strong>
            <p>
              As receitas podem ser adquiridas online: após a compra, você
              as recebe por e-mail e também pode baixá-las imediatamente no
              site. Para comprar, é necessário criar uma conta.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAjuda
