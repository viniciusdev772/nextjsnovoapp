import React from "react";

const PlanosComponent = () => {
  return (
    <div className="py-10 ">
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
              <p className="text-center font-bold my-3">R$19,99/mês</p>
              <button className="w-full bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition-colors duration-200">
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
              <p className="text-center font-low">+ Acesso a WhatsApp BOT</p>
              <p className="text-center font-bold my-3">R$49,99/mês</p>
              <button className="w-full bg-white text-green-500 font-bold py-2 px-4 rounded hover:bg-green-100 transition-colors duration-200">
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
              <p className="text-center font-bold my-3">R$99,99/mês</p>
              <button className="w-full bg-white text-red-500 font-bold py-2 px-4 rounded hover:bg-red-100 transition-colors duration-200">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanosComponent;
