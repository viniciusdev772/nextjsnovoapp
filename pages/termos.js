import Head from "next/head";

export default function Termos() {
  return (
    <>
      <Head>
        <title>Termos de Serviço</title>
      </Head>
      <div className="min-h-screen bg-gray-100 text-gray-700">
        <div className="container mx-auto py-12 px-6">
          <h1 className="text-3xl font-semibold text-center text-indigo-600">
            Termos de Serviço
          </h1>
          <p className="mt-5 text-lg text-center">
            Última atualização: 27 de fevereiro de 2024
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
            <p className="mb-4">
              Ao utilizar nosso serviço de armazenamento de arquivos, você
              concorda com os seguintes termos e condições. Pedimos que os leia
              cuidadosamente.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              2. Serviços Oferecidos
            </h2>
            <p className="mb-4">
              Nosso serviço oferece armazenamento de arquivos com 1GB gratuito
              para cada usuário, com velocidades de download ultra-rápidas e
              links diretos para todos os arquivos.
            </p>

            <h2 className="text-2xl font-semibold mb-4">3. Uso do Serviço</h2>
            <p className="mb-4">
              O usuário compromete-se a não utilizar o serviço para armazenar,
              distribuir, enviar, transmitir ou disponibilizar qualquer material
              de forma ilegal, incluindo, mas não limitado a, materiais
              protegidos por direitos autorais sem permissão.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              4. Modificações nos Termos
            </h2>
            <p className="mb-4">
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento, com ou sem aviso prévio. É responsabilidade do usuário
              revisar regularmente esta página para se atualizar sobre quaisquer
              mudanças.
            </p>

            <h2 className="text-2xl font-semibold mb-4">5. Contato</h2>
            <p className="mb-4">
              Em caso de dúvidas sobre estes termos, por favor, entre em contato
              conosco através do nosso site.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
