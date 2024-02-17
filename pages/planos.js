// pages/planos.js
import React from "react";

export default class Planos extends React.Component {
  render() {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
            Escolha Seu Plano
          </h1>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Plano 1 */}
            <div className="w-full max-w-sm bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold text-center">Plano Básico</h2>
                <p className="text-center my-3">5 GB de espaço</p>
                <p className="text-center font-semibold">
                  + Link Direto de Arquivos
                </p>
                <p className="text-center text-lg font-bold my-4">
                  R$19,99/mês
                </p>
                <button className="w-full bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition-colors duration-200">
                  Comprar
                </button>
              </div>
            </div>
            {/* Plano 2 */}
            <div className="w-full max-w-sm bg-gradient-to-r from-green-500 to-green-400 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold text-center">Plano Pro</h2>
                <p className="text-center my-3">15 GB de espaço</p>
                <p className="text-center font-semibold">
                  + Link Direto de Arquivos
                </p>
                <p className="text-center text-lg font-bold my-4">
                  R$49,99/mês
                </p>
                <button className="w-full bg-white text-green-500 font-bold py-2 px-4 rounded hover:bg-green-100 transition-colors duration-200">
                  Comprar
                </button>
              </div>
            </div>
            {/* Plano 3 */}
            <div className="w-full max-w-sm bg-gradient-to-r from-red-500 to-red-400 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold text-center">
                  Plano Premium
                </h2>
                <p className="text-center my-3">50 GB de espaço</p>
                <p className="text-center font-semibold">
                  + Link Direto de Arquivos
                </p>
                <p className="text-center text-lg font-bold my-4">
                  R$99,99/mês
                </p>
                <button className="w-full bg-white text-red-500 font-bold py-2 px-4 rounded hover:bg-red-100 transition-colors duration-200">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
