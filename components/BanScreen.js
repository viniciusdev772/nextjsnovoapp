import React from "react";

const BanScreen = () => {
  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center text-center text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Conta Suspensa</h1>
      <p className="text-xl md:text-2xl mb-8">
        Detectamos violações dos nossos Termos de Serviço relacionadas à
        hospedagem de arquivos não permitidos ou ao uso indevido dos recursos de
        armazenamento. Por isso, sua conta foi suspensa.
      </p>
      <p className="text-lg mb-5">
        Para mais informações ou se acredita que isso foi um engano, entre em
        contato com o suporte.
      </p>
      <a
        href="mailto:vinil6006@gmail.com"
        className="text-lg bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Contatar Suporte
      </a>
      <a
        href="/"
        className="mt-4 text-lg bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
      >
        Voltar à Página Inicial
      </a>
    </div>
  );
};

export default BanScreen;
