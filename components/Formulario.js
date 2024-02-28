import { useState } from "react";
import axios from "axios";
import Link from "next/link";

function Formulario() {
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [nomeCadastro, setNomeCadastro] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [modoFormulario, setModoFormulario] = useState("criarConta");
  const [mensagemResposta, setMensagemResposta] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const handleSubmitCriarConta = async (e) => {
    e.preventDefault();
    if (!aceitaTermos) {
      setMensagemResposta(
        "É necessário aceitar os termos e condições para criar uma conta."
      );
      return;
    }

    setCarregando(true);
    try {
      const response = await axios.post(
        `${process.env.API_ENDPOINT}/new_user`,
        {
          nome: nomeCadastro,
          email: emailCadastro,
          senha: senhaCadastro,
        }
      );
      setMensagemResposta(response.data.message);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setMensagemResposta(
        error.response?.data?.message || "Erro ao criar conta."
      );
    }
    setCarregando(false);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.API_ENDPOINT}/login`, {
        email: emailLogin,
        senha: senhaLogin,
      });
      setMensagemResposta(response.data.message);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", emailLogin);
      localStorage.setItem("nome", response.data.nome);
      localStorage.setItem("uid", response.data.uid);
      localStorage.setItem("storage", response.data.storage);
      localStorage.setItem("plano", response.data.plano);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.response?.data.banido) {
        window.location.href = "/ban";
      }
      setMensagemResposta(
        error.response?.data?.message || "Erro ao fazer login."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {mensagemResposta && (
          <div className="mb-4 text-center p-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
            {mensagemResposta}
          </div>
        )}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {modoFormulario === "criarConta" ? "Criar Conta" : "Login"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form
            className="mb-0 space-y-6"
            onSubmit={
              modoFormulario === "criarConta"
                ? handleSubmitCriarConta
                : handleSubmitLogin
            }
          >
            {modoFormulario === "criarConta" && (
              <>
                <div>
                  <label
                    htmlFor="nomeCadastro"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    id="nomeCadastro"
                    name="nomeCadastro"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={nomeCadastro}
                    onChange={(e) => setNomeCadastro(e.target.value)}
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={aceitaTermos}
                      onChange={(e) => setAceitaTermos(e.target.checked)}
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">
                      Eu aceito os{" "}
                      <Link href="/termos">
                        <a className="text-indigo-600 underline">
                          termos e condições
                        </a>
                      </Link>
                      .
                    </span>
                  </label>
                </div>
              </>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={
                  modoFormulario === "criarConta" ? emailCadastro : emailLogin
                }
                onChange={(e) =>
                  modoFormulario === "criarConta"
                    ? setEmailCadastro(e.target.value)
                    : setEmailLogin(e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={
                  modoFormulario === "criarConta" ? senhaCadastro : senhaLogin
                }
                onChange={(e) =>
                  modoFormulario === "criarConta"
                    ? setSenhaCadastro(e.target.value)
                    : setSenhaLogin(e.target.value)
                }
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {modoFormulario === "criarConta" ? "Criar Conta" : "Login"}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {modoFormulario === "criarConta"
                    ? "Já tem uma conta?"
                    : "Não tem uma conta?"}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() =>
                  setModoFormulario(
                    modoFormulario === "criarConta" ? "login" : "criarConta"
                  )
                }
              >
                {modoFormulario === "criarConta"
                  ? "Fazer Login"
                  : "Criar Conta"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
