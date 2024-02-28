import Head from "next/head";

export default function Termos() {
  return (
    <>
      <Head>
        <title>Termos de Serviço</title>
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <div className="container mx-auto py-16 px-6">
          <div className="bg-indigo-600 rounded-lg shadow-xl p-8 mb-12 text-white">
            <h1 className="text-4xl font-bold text-center">
              Termos de Serviço
            </h1>
            <p className="mt-4 text-lg text-center">
              Última atualização: 27 de fevereiro de 2024
            </p>
          </div>

          <section className="mb-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">1. Introdução</h2>
            <p className="text-lg mb-4">
              Ao utilizar nosso serviço de armazenamento de arquivos, você
              concorda com os seguintes termos e condições. Pedimos que os leia
              cuidadosamente.
            </p>
          </section>

          <section className="mb-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">2. Serviços Oferecidos</h2>
            <p className="text-lg mb-4">
              Nosso serviço oferece armazenamento de arquivos com 1GB gratuito
              para cada usuário, com velocidades de download ultra-rápidas e
              links diretos para todos os arquivos.
            </p>
          </section>

          <section className="mb-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">3. Uso do Serviço</h2>
            <p className="text-lg mb-4">
              O usuário compromete-se a não utilizar o serviço para armazenar,
              distribuir, enviar, transmitir ou disponibilizar qualquer material
              de forma ilegal, incluindo, mas não limitado a, materiais
              protegidos por direitos autorais sem permissão.
            </p>
            <p className="text-lg mb-4">
              Além disso, alertamos que qualquer violação das regras pode
              resultar no banimento permanente da conta do usuário, sem aviso
              prévio. Levamos a sério a integridade e a segurança de nosso
              serviço e de nossos usuários.
            </p>
          </section>

          <section className="mb-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">
              4. Modificações nos Termos
            </h2>
            <p className="text-lg mb-4">
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento, com ou sem aviso prévio. É responsabilidade do usuário
              revisar regularmente esta página para se atualizar sobre quaisquer
              mudanças.
            </p>
          </section>

          <section className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">5. Contato</h2>
            <p className="text-lg mb-4">
              Em caso de dúvidas sobre estes termos, por favor, entre em contato
              conosco através do nosso site.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
