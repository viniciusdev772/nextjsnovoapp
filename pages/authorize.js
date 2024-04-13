import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { LockClosedIcon, PlusCircleIcon } from "@heroicons/react/solid"; // Importe o ícone PlusCircleIcon para "Adicionar conta"

const AuthorizePage = () => {
  const router = useRouter();
  const [authorizationStatus, setAuthorizationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddAccount, setShowAddAccount] = useState(false); // Variável de estado para controlar a exibição do botão "Adicionar conta"
  const [userName, setUserName] = useState("");

  const authenticateToken = async (urlToken, localStorageToken) => {
    setIsLoading(true);
    try {
      if (!urlToken || !localStorageToken) {
        throw new Error(
          "Token inválido. Verifique se o token está presente na URL e no armazenamento local."
        );
      }

      const response = await axios.post(
        "https://cdn.viniciusdev.com.br/registrar_auth",
        { token: urlToken, auth: localStorageToken }
      );
      if (response.data.status === "ok") {
        if (urlToken.startsWith("webtoken")) {
          window.location.href = `https://vdev.viniciusdev.com.br/usuario/login?token=${urlToken}`;
        }
        setAuthorizationStatus("authorized");
      } else {
        setAuthorizationStatus("error");
        setErrorMessage("Não foi possível conceder autorização.");
      }
    } catch (error) {
      console.error("Erro ao enviar os tokens:", error.message);
      setAuthorizationStatus("error");
      setErrorMessage(
        "Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthorizeClick = () => {
    const { token } = router.query;
    const localStorageToken = localStorage.getItem("token");
    authenticateToken(token, localStorageToken);
  };

  const handleAddAccountClick = () => {
    // Adicione aqui a lógica para adicionar uma nova conta
    //ir para a página de login
    router.push("/");
  };

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("nome");
    if (!localStorageToken) {
      setShowAddAccount(true); // Mostrar o botão "Adicionar conta" se não houver nenhum token no armazenamento local
    } else {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <div className="text-center">
          <LockClosedIcon
            className="mx-auto h-12 w-12 text-indigo-500"
            aria-hidden="true"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Single Sign On
          </h2>
          <p className="mt-2 text-sm text-gray-500">SSO by Vdev</p>
        </div>
        <div className="mt-8">
          {userName && ( // Renderizar o perfil bonito se userName estiver definido
            <div className="flex items-center justify-center mb-6">
              {/* Substitua o ícone de perfil abaixo pelo ícone real que você deseja usar */}
              <img
                src="caminho_para_o_icone_de_perfil"
                alt="Perfil"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-gray-700">{userName}</span>
            </div>
          )}
          {showAddAccount && ( // Renderizar o botão "Adicionar conta" se showAddAccount for true
            <div className="mb-6">
              <button
                onClick={handleAddAccountClick}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Adicionar conta
              </button>
            </div>
          )}
          {!showAddAccount && ( // Renderizar o botão "Conceder Autorização" se showAddAccount for false
            <div className="mb-6">
              <button
                onClick={handleAuthorizeClick}
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V2.5a.5.5 0 00-1 0V4a1 1 0 01-1 1h-.5a.5.5 0 000 1H11a1 1 0 010 2H5a1 1 0 01-1-1zm14-8v.5a.5.5 0 01-1 0V4a1 1 0 00-1-1h-.5a.5.5 0 010-1H17a1 1 0 011 1zm-4.525 17.475a8 8 0 11-2.95-15.892A10 10 0 0021 12a10 10 0 00-10-10V0c5.523 0 10 4.477 10 10a9.994 9.994 0 01-1.525 5.275z"
                    ></path>
                  </svg>
                ) : (
                  `Logar com ${userName}`
                )}
              </button>
            </div>
          )}
          {authorizationStatus === "error" && (
            <div className="text-center">
              <p className="text-red-500">{errorMessage}</p>
            </div>
          )}
          {authorizationStatus === "authorized" && (
            <div className="text-center">
              <p className="text-green-500">
                Autorização concedida com sucesso!
              </p>
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Ao clicar em "Conceder Autorização", você concorda com nossos Termos
          de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
};

export default AuthorizePage;
