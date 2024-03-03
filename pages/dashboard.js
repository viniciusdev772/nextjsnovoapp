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
                <p>Downloads {item.downloads} </p>
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
      titulo: "AVISO",
      descricao:
        "esse servidor deixará de usar o link servidor.viniciusdev.com.br em breve novo link será viniciusdev.com.br, entrará em vigor dia 8 de março",
    },
  ]);

  useEffect(() => {
    fetchDashboardData().then((data) => {
      setItems(data.arquivos || []);
      //verificar se o o usuario está banido
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
    const response = await axios.post(
      "https://cdn.viniciusdev.com.br/delete_event",
      { id: fileId },
      {
        headers: {
          Authorization: tokenJWT,
        },
      }
    );
    if (response.status === 200) {
      closeActionsModal();
      setItems(items.filter((item) => item.id !== fileId));
      window.location.reload();
    } else {
      alert("Erro ao deletar arquivo");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white bg-opacity-30 backdrop-blur-lg p-4 fixed w-full z-10 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-gray-900 font-semibold text-xl">Dashboard</span>
          <button
            onClick={openUploadModal}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Novo Envio
          </button>
          <input
            type="text"
            placeholder="Buscar por arquivo..."
            className="ml-4 p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="bg-gray-800 text-white p-2 rounded-md focus:outline-none"
            >
              Menu
            </button>
            {isMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Perfil
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Configurações
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="pt-20">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Bem-vindo, {nomeDoLocal || "Usuário"}!
          </h1>

          <PromotionalBanner promocoes={promocoes} />
          {plano === "free" ? (
            <PlanosComponent />
          ) : plano ? (
            <div className="mb-6 text-lg font-semibold">
              Seu Plano é de {plano} e expira em {expiracao}
            </div>
          ) : null}
          <ItemList
            espacoDisponivel={espacoDisponivel}
            items={filteredItems}
            onItemSelected={openActionsModal}
          />
        </div>
        {selectedFile && (
          <FileActionsModal
            isOpen={isActionsModalOpen}
            onClose={closeActionsModal}
            onRemove={removeFile}
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
