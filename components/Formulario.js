import { useState } from "react";

function Formulario() {
  // Inicializa os estados para armazenar os valores dos inputs
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [funcionalidades, setFuncionalidades] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário
    // Aqui você pode adicionar a lógica para enviar os dados para um servidor, por exemplo
    console.log({ email, nome, funcionalidades });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow">
        <h1 className="text-xl font-semibold">Lista de Espera - VDEV CHAT</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 mt-1 border rounded"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="nome" className="text-sm font-medium">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="w-full p-2 mt-1 border rounded"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="funcionalidades" className="text-sm font-medium">
              Funcionalidades Esperadas
            </label>
            <textarea
              id="funcionalidades"
              name="funcionalidades"
              rows="4"
              className="w-full p-2 mt-1 border rounded"
              placeholder="Descreva as funcionalidades que você espera do VDEV CHAT"
              value={funcionalidades}
              onChange={(e) => setFuncionalidades(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Inscrever-se
          </button>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
