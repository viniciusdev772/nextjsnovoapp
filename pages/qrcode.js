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
      const getUserAgent = () => {
        return navigator.userAgent;
      };

      const getBrowserInfo = () => {
        return {
          language: navigator.language,
          platform: navigator.platform,
        };
      };

      const generateToken = () => {
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
      };

      const userAgent = getUserAgent();
      const browserInfo = getBrowserInfo();
      const uniqueToken = generateToken();

      const data = {
        userAgent: userAgent,
        browserInfo: browserInfo,
      };

      const jsonData = btoa(JSON.stringify(data));
      setUserInfo(jsonData);
      setToken(uniqueToken);

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
          setRegistrationComplete(true);
        } catch (error) {
          console.error(
            "Erro ao enviar solicitação POST (register_qr):",
            error
          );
        }
      };

      registerQR();
    };

    fetchQrCode();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (registrationComplete) {
        const checkQR = async () => {
          try {
            const checkResponse = await fetch(
              "https://cdn.viniciusdev.com.br/check_qr",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: token,
                  unico: token,
                }),
              }
            );
            const checkData = await checkResponse.json();
            console.log("Resposta da API (check_qr):", checkData);
            if (checkData.token && checkData.token !== "") {
              localStorage.setItem("token", checkData.token);
              router.push("/");
            }
          } catch (error) {
            console.error("Erro ao enviar solicitação POST (check_qr):", error);
          }
        };

        checkQR();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [registrationComplete, token, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {registrationComplete && userInfo && (
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <QRCode value={userInfo} size={256} />
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Faça login no site escaneando pelo App Móvel.
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
