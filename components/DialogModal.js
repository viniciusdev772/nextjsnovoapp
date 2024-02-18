import React, { useEffect, useState } from "react";

const DialogModal = ({ isOpen, onClose, message, qrCodeImg, qrCodeText }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    }
  }, [isOpen]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(qrCodeText).then(() => {
      alert("Texto copiado!");
    });
  };

  const handleClose = () => {
    document.getElementById("modal").classList.replace("fade-in", "fade-out");
    setTimeout(() => {
      setShowModal(false);
      onClose();
    }, 300);
  };

  if (!showModal) return null;

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex justify-center items-center fade-in"
      style={{
        animation: "fadeIn 0.5s",
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full m-4"
        style={{
          transition: "transform 0.3s ease-out",
          transform: isOpen ? "scale(1)" : "scale(0.95)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-medium">Resposta</h4>
          <button onClick={handleClose} className="text-lg font-semibold">
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center mb-4">
          <img src={qrCodeImg} alt="QR Code" className="mb-4" />
          <p>{message}</p>
          <button
            onClick={handleCopyText}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-all duration-150"
          >
            Copiar QR Code
          </button>
        </div>
        <div className="text-right mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all duration-150"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogModal;
