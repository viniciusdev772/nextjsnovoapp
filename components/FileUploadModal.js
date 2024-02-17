import { useState, useRef } from "react";
import axios from "axios";

function FileUploadModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // Adicionado para gerenciar mensagens de erro
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 700 * 1024 * 1024; // 700MB em bytes

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      if (newFile.size > MAX_FILE_SIZE) {
        setErrorMessage(
          "O arquivo excede o limite de 700MB. Por favor, selecione um arquivo menor."
        );
        return; // Impede a seleção do arquivo
      } else {
        setErrorMessage(""); // Limpa a mensagem de erro se o arquivo é válido
      }

      setFile(newFile);
      if (newFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result.toString());
        };
        reader.readAsDataURL(newFile);
      } else {
        setPreviewUrl("");
      }
      setProgress(0); // Reseta o progresso ao selecionar um novo arquivo
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("arquivo", file);

    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: function (progressEvent) {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };

    axios
      .post("https://cdn.viniciusdev.com.br/upload_event", formData, config)
      .then((response) => {
        console.log(response.data);
        onClose(); // Fecha o modal após o sucesso do upload
      })
      .catch((error) => {
        console.error("Upload error: ", error);
        // Atualizar para exibir a mensagem de erro de forma apropriada
        setErrorMessage("Erro ao fazer upload do arquivo: " + error.message);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Upload de Arquivo
          </h3>
          <div className="mt-2">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mb-4 mx-auto max-h-40"
              />
            )}
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={triggerFileInput}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 m-2"
            >
              Escolher Arquivo
            </button>
            {file && (
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 m-2"
              >
                Confirmar Envio
              </button>
            )}
          </div>
          {/* Exibe a mensagem de erro aqui */}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUploadModal;
