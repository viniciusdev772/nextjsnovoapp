import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthorizePage = () => {
  const router = useRouter();
  const [authorizationStatus, setAuthorizationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const authenticateToken = async (urlToken, localStorageToken) => {
    setIsLoading(true);
    try {
      if (!urlToken || !localStorageToken) {
        throw new Error("Token inválido. Verifique se o token está presente na URL e no armazenamento local.");
      }

      const response = await axios.post(
        "https://cdn.viniciusdev.com.br/registrar_auth",
        { token: urlToken, auth: localStorageToken }
      );
      if (response.data.status === "ok") {
        setAuthorizationStatus("authorized");
      } else {
        setAuthorizationStatus("error");
        setErrorMessage("Não foi possível conceder autorização.");
      }
    } catch (error) {
      console.error("Erro ao enviar os tokens:", error.message);
      setAuthorizationStatus("error");
      setErrorMessage("Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthorizeClick = () => {
    const { token } = router.query;
    const localStorageToken = localStorage.getItem("token");
    authenticateToken(token, localStorageToken);
  };

  useEffect(() => {
    if (!router.query.token) {
      setAuthorizationStatus("error");
      setErrorMessage("Token não encontrado na URL.");
    }
  }, [router.query.token]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setAuthorizationStatus("error");
      setErrorMessage("Token não encontrado no armazenamento local.");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Autorização de Login</h2>
        <div className="mb-6">
          <p className="text-gray-700 text-center">Bem-vindo ao Nosso App!</p>
          <p className="text-gray-600 text-center mt-2">Por favor, faça login com sua conta para continuar.</p>
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleAuthorizeClick}
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring focus:ring-blue-200 ${isLoading && "opacity-50 cursor-not-allowed"}`}
          >
            {isLoading ? "Aguarde..." : "Conceder Autorização"}
          </button>
        </div>
        {authorizationStatus === "authorized" && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <p className="text-green-600 font-semibold">Autorização Concedida!</p>
            <p className="text-gray-700">Você está autorizado a acessar o aplicativo.</p>
          </div>
        )}
        {authorizationStatus === "error" && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-red-600 font-semibold">Erro de Autorização</p>
            <p className="text-gray-700">{errorMessage}</p>
          </div>
        )}
        <p className="text-center text-gray-600">
          Ao clicar em "Conceder Autorização", você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
};

export default AuthorizePage;
