import React, { useEffect, useState } from "react";
import axios from "axios";
import FileUploadModal from "../components/FileUploadModal";
import FileActionsModal from "../components/FileActionsModal";
import Link from "next/link";

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
      throw new Error("Token JWT não encontrado");
    }
    const response = await axios.post(
      "http://localhost:3002/dashboard",
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
    return { arquivos: [], espacoDisponivel: 0 };
  }
};

function ItemList({ espacoDisponivel, items, onItemSelected }) {
  if (!items.length) return <div>Nenhum item encontrado.</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {" "}
        {formatBytes(espacoDisponivel)}
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
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => onItemSelected(item)}
            >
              Ações
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [nomeDoLocal, setNomeDoLocal] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [items, setItems] = useState([]);
  const [espacoDisponivel, setEspacoDisponivel] = useState(0);

  useEffect(() => {
    fetchDashboardData().then((data) => {
      setItems(data.arquivos || []);
      setEspacoDisponivel(data.espacoDisponivel || 0);
    });

    const nome = localStorage.getItem("nome");
    if (nome) {
      setNomeDoLocal(nome);
    }
  }, []);

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
    setIsActionsModalOpen(false); // Garante que apenas um modal esteja aberto por vez
  };

  const closeUploadModal = () => setIsUploadModalOpen(false);

  const openActionsModal = (file) => {
    setSelectedFile(file);
    setIsActionsModalOpen(true);
    setIsUploadModalOpen(false); // Garante que apenas um modal esteja aberto por vez
  };

  const closeActionsModal = () => setIsActionsModalOpen(false);

  const removeFile = async (fileId) => {
    console.log(`Removendo arquivo com ID: ${fileId}`);
    closeActionsModal();
  };

  const generateDirectLink = (fileId) => {
    console.log(`Gerando link para arquivo com ID: ${fileId}`);
    closeActionsModal();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white bg-opacity-30 backdrop-blur-lg p-4 fixed w-full z-10 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-gray-900 font-semibold text-xl">Dashboard</span>
          <button
            onClick={openUploadModal}
            className="text-gray-900 bg-white bg-opacity-80 hover:bg-opacity-90 transition duration-300 font-semibold px-4 py-2 rounded-lg shadow"
          >
            Novo Envio
          </button>
        </div>
      </nav>
      <div className="pt-20">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Bem-vindo, {nomeDoLocal || "Usuário"}!
          </h1>
          <ItemList
            espacoDisponivel={espacoDisponivel}
            items={items}
            onItemSelected={openActionsModal}
          />
        </div>
        {selectedFile && (
          <FileActionsModal
            isOpen={isActionsModalOpen}
            onClose={closeActionsModal}
            onRemove={removeFile}
            onGenerateLink={generateDirectLink}
            file={selectedFile}
          />
        )}
        <FileUploadModal
          isOpen={isUploadModalOpen}
          onClose={closeUploadModal}
        />
      </div>
    </div>
  );
}
