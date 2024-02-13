import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const allowedExtensions = ["png", "jpg", "jpeg", "gif", "pdf", "docx", "txt"];

  const isExtensionAllowed = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setErrorMessage("");
      setUploadSuccessMessage("");
      setUploadProgress(0);

      if (!isExtensionAllowed(file.name)) {
        setErrorMessage("Extensão de arquivo não permitida.");
        setFile(null);
        setPreview("");
        return;
      }

      if (file.size > 700 * 1024 * 1024) {
        setErrorMessage("O arquivo excede o limite de 700MB.");
        setFile(null);
        setPreview("");
        return;
      }

      setFile(file);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(`Arquivo selecionado: .${file.name.split(".").pop()}`);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      console.log(
        "Nenhum arquivo selecionado ou arquivo não permitido/tamanho excedido."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file-upload", file);

    try {
      const response = await axios.post(
        "http://localhost:3002/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.status === 200) {
        const fileLink = response.data.fileLink;
        setUploadSuccessMessage(
          <>
            Arquivo enviado com sucesso!{" "}
            <a href={fileLink} target="_blank" rel="noopener noreferrer">
              Clique aqui
            </a>{" "}
            para acessar.
          </>
        );
        setFile(null);
        setPreview("");
        setErrorMessage("");
      } else {
        throw new Error("Falha ao enviar arquivo.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao enviar o arquivo. Tente novamente.");
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-lg"
      >
        <div className="text-2xl font-bold">Upload de Arquivo</div>
        <p className="text-center text-md mb-4">
          Este sistema é experimental e, por isso, limita-se às seguintes
          extensões de arquivo para upload: {allowedExtensions.join(", ")}.
          Agradecemos a compreensão.
        </p>
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500">
              Clique para fazer o upload
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF, PDF, DOCX, TXT até 700MB
            </p>
          </div>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {uploadSuccessMessage && (
          <p className="text-green-500">{uploadSuccessMessage}</p>
        )}
        {preview &&
          !errorMessage &&
          (file?.type.startsWith("image/") ? (
            <img src={preview} alt="Preview" className="max-w-xs max-h-64" />
          ) : (
            <p>{preview}</p>
          ))}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
      </form>
    </div>
  );
}
