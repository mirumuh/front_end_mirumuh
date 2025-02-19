const ModalRedirecionamento = ({ isOpen, onClose }) => {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-50 md:w-2/5 relative">
          <button className="absolute top-3 right-3 text-brown hover:light-darker-brown" onClick={onClose}>
            ✖
          </button>
  
          <h2 className="text-brown font-semibold text-center text-[22px] px-8">Encomendas Personalizadas</h2>
  
          <p className="text-brown text-center text-justify p-2 mt-4">
            Verifique a disponibilidade da agenda e entre em contato comigo!
            Para reservar sua posição na fila basta pagar <strong>50% do valor combinado da encomenda</strong>.
          </p>
  
          <div className="flex justify-center mt-6">
            <a
              href="https://wa.me/555198300919"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue text-brown flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-light-darker-blue"
            >
              <img src="/icons/telefone.svg" alt="WhatsApp" width={24} height={24} />
              Entrar em contato
            </a>
          </div>
        </div>
      </div>
    )
  }
  
  export default ModalRedirecionamento
  