import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthorizePage = () => {
  const router = useRouter();
  const [authorizationStatus, setAuthorizationStatus] = useState(null);

  useEffect(() => {
    const { token } = router.query;
    if (token) {
    } else {
      alert("Token não encontrado da URL.");
    }
  }, []);

  const authenticateToken = async (urlToken) => {
    try {
      const localStorageToken = localStorage.getItem("token");
      if (localStorageToken) {
        const response = await axios.post(
          "https://cdn.viniciusdev.com.br/registrar_auth",
          { token: urlToken, auth: localStorageToken }
        );
        if (response.data.status === "ok") {
          setAuthorizationStatus("authorized");
        } else {
          setAuthorizationStatus("error");
        }
      } else {
        setAuthorizationStatus("localStorageTokenMissing");
      }
    } catch (error) {
      console.error("Erro ao enviar os tokens:", error);
      setAuthorizationStatus("error");
    }
  };

  const handleAuthorizeClick = () => {
    const { token } = router.query;
    if (token) {
      alert(token);
      authenticateToken(token);
    } else {
      alert("Token não encontrado d URL.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Autorização de Login
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <p className="text-blue-600 font-semibold">Bem-vindo ao Nosso App!</p>
          <p className="text-gray-700">
            Por favor, faça login com sua conta para continuar.
          </p>
        </div>
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={handleAuthorizeClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full focus:outline-none focus:ring focus:ring-blue-200"
          >
            Conceder Autorização
          </button>
        </div>
        {authorizationStatus === "authorized" && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <p className="text-green-600 font-semibold">
              Autorização Concedida!
            </p>
            <p className="text-gray-700">
              Você está autorizado a acessar o aplicativo.
            </p>
          </div>
        )}
        {authorizationStatus === "error" && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-red-600 font-semibold">Erro de Autorização</p>
            <p className="text-gray-700">
              Houve um problema ao processar sua autorização. Por favor, tente
              novamente mais tarde.
            </p>
          </div>
        )}
        <p className="text-center text-gray-600">
          Ao clicar em "Conceder Autorização", você concorda com nossos Termos
          de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
};

export default AuthorizePage;
