import { useState, useRef } from "react";
import axios from "axios";

function FileUploadModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [showChooseButton, setShowChooseButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 700 * 1024 * 1024;

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      if (newFile.size > MAX_FILE_SIZE) {
        setErrorMessage(
          "O arquivo excede o limite de 700MB. Por favor, selecione um arquivo menor."
        );
        return;
      } else {
        setErrorMessage("");
      }

      setFile(newFile);
      setShowChooseButton(false); // Esconde o botão de escolher arquivo após a seleção
      if (newFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result.toString());
        };
        reader.readAsDataURL(newFile);
      } else {
        setPreviewUrl("");
      }
      setProgress(0);
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
        "Content-Length": file.size,
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
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Upload error: ", error);
        setErrorMessage("Erro ao fazer upload do arquivo: " + error.message);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Upload de Arquivo
          </h3>
          <div className="mt-2 space-y-4">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto rounded-lg max-h-60"
              />
            )}
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            {showChooseButton && (
              <button
                onClick={triggerFileInput}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Escolher Arquivo
              </button>
            )}
            {file && (
              <button
                onClick={handleUpload}
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Confirmar Envio
              </button>
            )}
          </div>
          {errorMessage && (
            <div className="text-red-600 dark:text-red-400">{errorMessage}</div>
          )}
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full text-center text-white"
              style={{ width: `${progress}%` }}
            >
              {progress > 0 && `${progress}%`}
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
