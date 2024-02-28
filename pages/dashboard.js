import React, { useEffect, useState } from "react";
import axios from "axios";
import FileUploadModal from "../components/FileUploadModal";
import FileActionsModal from "../components/FileActionsModal";
import PlanosComponent from "../components/PlanosComponent";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const fetchDashboardData = async () => {
  try {
    const tokenJWT = localStorage.getItem("token");
    if (!tokenJWT) {
      window.location.href = "/";
    }
    const response = await axios.post(
      "https://cdn.viniciusdev.com.br/dashboard",
      {},
      {
        headers: {
          Authorization: tokenJWT,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    return { arquivos: [], espacoDisponivel: 0, expiracao: 0, planos: "" };
  }
};

function PromotionalBanner({ promocoes }) {
  if (!promocoes.length) return null;

  return (
    <div className="mb-6">
      {promocoes.map((promocao, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-lg shadow mb-4"
        >
          <h2 className="font-semibold text-lg">{promocao.titulo}</h2>
          <p>{promocao.descricao}</p>
        </div>
      ))}
    </div>
  );
}

function ItemList({ espacoDisponivel, items, onItemSelected }) {
  return (
    <div>
      {!items.length ? (
        <>
          <div>Nenhum item encontrado.</div>
          <h2 className="text-xl font-bold mb-4">
            Você ainda tem {formatBytes(espacoDisponivel)} Livres
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">
            Você ainda tem {formatBytes(espacoDisponivel)} Livres
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">{item.nome}</h3>
                <p>{formatBytes(item.size)}</p>
                Link:{" "}
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.link}
                </a>
                <p>{item.description}</p>
                <button
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  onClick={() => onItemSelected(item)}
                >
                  Ações
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [nomeDoLocal, setNomeDoLocal] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [items, setItems] = useState([]);
  const [plano, setPlano] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [espacoDisponivel, setEspacoDisponivel] = useState(0);
  const [expiracao, setExpiracao] = useState("");
  const [promocoes, setPromocoes] = useState([
    {
      titulo: "Mais por Menos!",
      descricao: "Mais espaço por menos dinheiro!",
    },
  ]);

  useEffect(() => {
    fetchDashboardData().then((data) => {
      setItems(data.arquivos || []);
      if (data.banido) {
        localStorage.clear();
        window.location.href = "/ban";
      }
      setExpiracao(data.expiracao || "");
      setPlano(data.plano || "free");
      setEspacoDisponivel(data.espacoDisponivel || 0);
    });

    const nome = localStorage.getItem("nome");
    if (nome) {
      setNomeDoLocal(nome);
    }
  }, []);

  const filteredItems = items.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
    setIsActionsModalOpen(false);
  };

  const closeUploadModal = () => setIsUploadModalOpen(false);

  const openActionsModal = (file) => {
    setSelectedFile(file);
    setIsActionsModalOpen(true);
    setIsUploadModalOpen(false);
  };

  const closeActionsModal = () => setIsActionsModalOpen(false);

  const removeFile = async (fileId) => {
    const tokenJWT = localStorage.getItem("token");
    try {
      await axios.post(
        `https://cdn.viniciusdev.com.br/delete/${fileId}`,
        {},
        {
          headers: {
            Authorization: tokenJWT,
          },
        }
      );
      setItems(items.filter((item) => item.id !== fileId));
      closeActionsModal();
    } catch (error) {
      console.error("Erro ao remover arquivo:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard de {nomeDoLocal}</h1>
      <PromotionalBanner promocoes={promocoes} />
      <div className="mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          onClick={openUploadModal}
        >
          Enviar Arquivo
        </button>
        <input
          type="text"
          placeholder="Buscar por arquivo..."
          className="ml-4 p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ItemList
        espacoDisponivel={espacoDisponivel}
        items={filteredItems}
        onItemSelected={openActionsModal}
      />
      {isUploadModalOpen && <FileUploadModal closeModal={closeUploadModal} />}
      {isActionsModalOpen && (
        <FileActionsModal
          file={selectedFile}
          closeModal={closeActionsModal}
          removeFile={removeFile}
        />
      )}
      <PlanosComponent plano={plano} expiracao={expiracao} />
    </div>
  );
}
