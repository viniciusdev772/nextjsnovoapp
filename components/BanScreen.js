import React from "react";

const BanScreen = () => {
  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-center text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Você foi Banido!</h1>
      <p className="text-xl md:text-2xl mb-8">
        Sua conta foi suspensa devido a atividades suspeitas.
      </p>
      <a
        href="/"
        className="text-lg bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Voltar à Página Inicial
      </a>
    </div>
  );
};

export default BanScreen;
