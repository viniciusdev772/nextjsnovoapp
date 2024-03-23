import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";

const QrCodePage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);

  useEffect(() => {
    const fetchQrCode = async () => {
      // Função para obter o User Agent
      const getUserAgent = () => {
        return navigator.userAgent;
      };

      // Função para obter outras informações do navegador
      const getBrowserInfo = () => {
        return {
          language: navigator.language,
          platform: navigator.platform,
        };
      };

      // Criar um token único
      const generateToken = () => {
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
      };

      // Obter informações do navegador e gerar o token ao montar o componente
      const userAgent = getUserAgent();
      const browserInfo = getBrowserInfo();
      const uniqueToken = generateToken();

      // Montar o objeto JSON
      const data = {
        userAgent: userAgent,
        browserInfo: browserInfo,
      };

      // Codificar o JSON em Base64
      const jsonData = btoa(JSON.stringify(data));
      setUserInfo(jsonData);
      setToken(uniqueToken);

      // Função para fazer a solicitação POST para a API (register_qr)
      const registerQR = async () => {
        try {
          const response = await fetch(
            "https://cdn.viniciusdev.com.br/register_qr",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: jsonData,
                unico: uniqueToken,
              }),
            }
          );
          const responseData = await response.json();
          console.log("Resposta da API (register_qr):", responseData);
          setRegistrationComplete(true); // Marca o registro como concluído
        } catch (error) {
          console.error(
            "Erro ao enviar solicitação POST (register_qr):",
            error
          );
        }
      };

      // Realizar o registro QR ao montar o componente
      registerQR();
    };

    fetchQrCode();
  }, []);

  // Renderizar o componente de QR Code somente quando o registro estiver completo
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {registrationComplete && userInfo && (
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <QRCode value={userInfo} size={256} />
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Escaneie o QR Code para fazer login pelo App Móvel
          </p>
          {token && (
            <p className="text-gray-600 text-sm">Token único: {token}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QrCodePage;
