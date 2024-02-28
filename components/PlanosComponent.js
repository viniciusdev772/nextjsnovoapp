import React, { useState } from "react";
import DialogModal from "./DialogModal";
const PlanosComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalContent, setModalContent] = useState({
    message: "",
    qrCodeImg: "",
    qrCodeText: "",
  });

  const handlePurchase = async (plano) => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://cdn.viniciusdev.com.br/change_plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ plano }),
    });

    const data = await response.json();

    setModalContent({
      message: data.message, // Supondo que seja a mensagem para o usuário
      qrCodeImg: data.qrCodeImg, // Substitua com a URL real do QR Code retornada pela API
      qrCodeText: data.qrCodeText, // Substitua pelo texto real relacionado ao QR Code
    }); // Supondo que a API retorne uma mensagem no campo 'message'
    setIsModalOpen(true);
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Escolha Seu Plano
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {/* Plano 1 */}
          <div className="max-w-xs w-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 text-white">
              <h2 className="text-xl font-bold text-center">Plano Básico</h2>
              <p className="text-center my-2">5 GB de espaço</p>
              <p className="text-center font-medium">
                + Link Direto de Arquivos
              </p>
              <p className="text-center font-bold my-3">R$0,99/mês</p>
              <button
                className="w-full bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition-colors duration-200"
                onClick={() => handlePurchase("5GB")}
              >
                Comprar
              </button>
            </div>
          </div>
          {/* Plano 2 */}
          <div className="max-w-xs w-full bg-gradient-to-r from-green-500 to-green-400 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 text-white">
              <h2 className="text-xl font-bold text-center">Plano Pro</h2>
              <p className="text-center my-2">15 GB de espaço</p>
              <p className="text-center font-medium">
                Tudo dos Planos Anteriores e mais :
              </p>
              <p className="text-center font-low">
                + Acesso a WhatsApp BOT sendo Desenvolvido
              </p>
              <p className="text-center font-bold my-3">R$4,99/mês</p>
              <button
                className="w-full bg-white text-green-500 font-bold py-2 px-4 rounded hover:bg-green-100 transition-colors duration-200"
                onClick={() => handlePurchase("15GB")}
              >
                Comprar
              </button>
            </div>
          </div>
          {/* Plano 3 */}
          <div className="max-w-xs w-full bg-gradient-to-r from-red-500 to-red-400 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 text-white">
              <h2 className="text-xl font-bold text-center">Plano Premium</h2>
              <p className="text-center my-2">50 GB de espaço</p>
              <p className="text-center font-medium">
                Tudo dos Planos Anteriores e mais :
              </p>
              <p className="text-center font-bold my-3">R$9,99/mês</p>
              <button
                className="w-full bg-white text-red-500 font-bold py-2 px-4 rounded hover:bg-red-100 transition-colors duration-200"
                onClick={() => handlePurchase("50GB")}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>

        <DialogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={modalContent.message}
          qrCodeImg={modalContent.qrCodeImg}
          qrCodeText={modalContent.qrCodeText}
        />
      </div>
    </div>
  );
};

export default PlanosComponent;
