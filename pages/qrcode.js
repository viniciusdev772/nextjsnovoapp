import { useState } from "react";
import QRCode from "qrcode.react";

const QrCodePage = () => {
  const [text, setText] = useState("Digite o texto aqui");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4 w-80"
        placeholder="Digite o texto para gerar o QR Code"
      />
      <div className="mb-4">
        <QRCode value={text} />
      </div>
      <p className="text-gray-600 text-sm">
        Escaneie o QR Code acima para visualizar o texto.
      </p>
    </div>
  );
};

export default QrCodePage;
