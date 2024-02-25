import React, { useEffect } from "react";
import axios from "axios";
import Formulario from "../components/Formulario";

export default function Home() {
  useEffect(() => {
    const tokenJWT = localStorage.getItem("token");
    if (!tokenJWT) {
      window.location.href = "/";
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

        // Verifica se a resposta é 200 e redireciona para o dashboard
        if (response.status === 200) {
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.error("Erro ao fazer requisição", error);
        // Aqui você pode lidar com erros, como mostrar uma mensagem ao usuário
      }
    };

    fetchData();
  }, []); // O array vazio como segundo argumento significa que isso vai rodar apenas uma vez, quando o componente for montado.

  return (
    <div>
      <Formulario />
    </div>
  );
}
