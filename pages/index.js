import React, { useEffect, useState } from "react";
import axios from "axios";
import Formulario from "../components/Formulario";

export default function Home() {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const tokenJWT = localStorage.getItem("token");

    if (!tokenJWT) {
      setCarregando(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://cdn.viniciusdev.com.br/dashboard",
          {},
          {
            headers: {
              Authorization: tokenJWT,
            },
          }
        );

        if (response.status === 200) {
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.error("Erro ao fazer requisição", error);
        setCarregando(false);
        // Aqui você pode lidar com erros, como mostrar uma mensagem ao usuário
      }
    };

    fetchData();
  }, []);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Formulario />
    </div>
  );
}
