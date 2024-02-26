import React, { useEffect } from "react";
import axios from "axios";
import Formulario from "../components/Formulario";

export default function Home() {
  useEffect(() => {
    const tokenJWT = localStorage.getItem("token");

    if (tokenJWT) {
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
    }
    // Se não tiver tokenJWT, o componente simplesmente renderiza o formulário sem tentar redirecionar
  }, []);

  // Se não houver token no localStorage, mostra o formulário diretamente
  const tokenJWT = localStorage.getItem("token");
  if (!tokenJWT) {
    return (
      <div>
        <Formulario />
      </div>
    );
  }

  // Se tiver token, mas a requisição ainda não foi feita ou está em processo, pode renderizar um loading ou simplesmente null
  // Isso evita que o formulário pisque antes do redirecionamento quando o token existe
  return null;
}
