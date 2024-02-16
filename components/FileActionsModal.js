// FileActionsModal.js
import React from "react";

const FileActionsModal = ({
  isOpen,
  onClose,
  onRemove,
  onGenerateLink,
  file,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Ações para {file.nome}</h2>
        <ul className="space-y-2">
          <li>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => onRemove(file.id)}
            >
              Apagar
            </button>
          </li>
          <li>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => onGenerateLink(file.id)}
            >
              Gerar Link Direto
            </button>
          </li>
        </ul>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileActionsModal;
