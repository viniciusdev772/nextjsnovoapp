import Head from "next/head";

export default function Termos() {
  return (
    <>
      <Head>
        <title>Termos de Serviço</title>
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="bg-indigo-600 rounded-lg p-6 mb-8 text-white">
            <h1 className="text-3xl font-bold text-center">
              Termos de Serviço
            </h1>
            <p className="mt-2 text-lg text-center">
              Última atualização: 21 de abril de 2024
            </p>
          </div>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">1. Introdução</h2>
            <p className="text-gray-700 leading-relaxed">
              Ao utilizar nosso serviço de armazenamento e compartilhamento de
              arquivos, você concorda com os seguintes termos e condições.
              Pedimos que os leia cuidadosamente.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">2. Serviços Oferecidos</h2>
            <p className="text-gray-700 leading-relaxed">
              Nosso serviço oferece armazenamento de arquivos com 10GB gratuito
              para cada usuário, com velocidades de download ultra-rápidas e
              links diretos para todos os arquivos. Também oferecemos planos
              pagos com mais espaço de armazenamento e recursos adicionais.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">3. Uso do Serviço</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O usuário compromete-se a não utilizar o serviço para armazenar,
              distribuir, enviar, transmitir ou disponibilizar qualquer material
              de forma ilegal, incluindo, mas não limitado a, materiais
              protegidos por direitos autorais sem permissão.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Além disso, alertamos que qualquer violação das regras pode
              resultar no banimento permanente da conta do usuário, sem aviso
              prévio. Levamos a sério a integridade e a segurança de nosso
              serviço e de nossos usuários.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">
              4. Modificações nos Termos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento, com ou sem aviso prévio. É responsabilidade do usuário
              revisar regularmente esta página para se atualizar sobre quaisquer
              mudanças.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">5. Contato</h2>
            <p className="text-gray-700 leading-relaxed">
              Em caso de dúvidas sobre estes termos, por favor, entre em contato
              conosco através do nosso site.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">
              6. Privacidade dos Dados
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nós nos comprometemos a proteger a privacidade dos dados dos
              usuários. Todos os dados pessoais são tratados de acordo com nossa
              política de privacidade.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Não compartilharemos ou venderemos suas informações pessoais a
              terceiros, exceto quando exigido por lei ou conforme descrito em
              nossa política de privacidade.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">
              7. Responsabilidade do Usuário
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O usuário é responsável por manter a segurança de sua conta e
              senha. Não nos responsabilizamos por acessos não autorizados à
              conta do usuário devido à negligência na proteção de suas
              credenciais.
            </p>
            <p className="text-gray-700 leading-relaxed">
              O usuário também é responsável por garantir que os arquivos
              carregados não violem direitos de terceiros, incluindo direitos
              autorais, marcas registradas e outros direitos de propriedade
              intelectual.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">8. Limitações de Uso</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O serviço não pode ser utilizado para hospedar, compartilhar ou
              distribuir conteúdo ilegal, obsceno, difamatório, ameaçador ou que
              viole direitos de terceiros. Arquivos contendo vírus, malware ou
              qualquer código malicioso também são estritamente proibidos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Reservamo-nos o direito de remover ou desativar o acesso a
              qualquer arquivo ou conta que viole estes termos, sem aviso
              prévio.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">
              9. Direitos de Propriedade Intelectual
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              O usuário mantém todos os direitos de propriedade sobre os
              arquivos enviados para o serviço. No entanto, ao utilizar o
              serviço, o usuário concede uma licença limitada, não exclusiva e
              revogável para que o serviço hospede, copie, transmita e exiba os
              arquivos conforme necessário para a operação do serviço.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Todos os direitos de propriedade intelectual relativos ao serviço
              e seu conteúdo, exceto pelos arquivos enviados pelos usuários,
              pertencem a nós ou a nossos licenciadores.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">
              10. Limitação de Responsabilidade
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Não nos responsabilizamos por quaisquer danos diretos, indiretos,
              incidentais, especiais ou consequenciais decorrentes do uso ou
              impossibilidade de uso do serviço, incluindo, mas não limitado a,
              perda de dados, lucros ou receitas.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nosso serviço é fornecido "como está", sem garantias de qualquer
              tipo, expressas ou implícitas.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">11. Rescisão</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Reservamo-nos o direito de rescindir ou suspender o acesso ao
              serviço a qualquer momento, por qualquer motivo, sem aviso prévio
              ou responsabilidade.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Após a rescisão, todos os seus dados e arquivos serão removidos
              permanentemente de nossos servidores.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">12. Uso Comercial</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nosso serviço é destinado principalmente para uso pessoal e não
              comercial. Qualquer uso comercial do serviço requer nossa
              aprovação prévia por escrito.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Se você desejar usar nosso serviço para fins comerciais, entre em
              contato conosco para obter mais informações sobre nossos planos
              comerciais e preços.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">13. Backup de Dados</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              É sua responsabilidade fazer backup de seus arquivos e dados
              armazenados em nosso serviço. Não nos responsabilizamos por perda
              ou danos aos dados decorrentes de falhas de sistema, erros de
              software ou outros eventos fora de nosso controle.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Recomendamos que você faça backups regulares de seus dados
              importantes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">14. Links Externos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nosso serviço pode conter links para sites ou recursos externos.
              Não temos controle sobre o conteúdo ou as práticas desses sites
              externos e não nos responsabilizamos por eles.
            </p>
            <p className="text-gray-700 leading-relaxed">
              O uso de links externos é por sua conta e risco.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">15. Indenização</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Você concorda em indenizar, defender e isentar de responsabilidade
              a nossa empresa, nossos diretores, funcionários, agentes e
              afiliados contra quaisquer reivindicações, danos, perdas,
              responsabilidades, custos e despesas (incluindo honorários
              advocatícios) decorrentes ou relacionados ao uso indevido do
              serviço ou à violação destes termos.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">
              16. Disputas e Arbitragem
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Quaisquer disputas decorrentes destes termos ou do uso do serviço
              serão resolvidas por meio de arbitragem vinculativa, de acordo com
              as regras de arbitragem aplicáveis.
            </p>
            <p className="text-gray-700 leading-relaxed">
              A sede da arbitragem será na cidade onde nossa empresa está
              sediada.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">17. Lei Aplicável</h2>
            <p className="text-gray-700 leading-relaxed">
              Estes termos serão regidos e interpretados de acordo com as leis
              do país onde nossa empresa está sediada.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">18. Cessão</h2>
            <p className="text-gray-700 leading-relaxed">
              Você não pode ceder ou transferir seus direitos ou obrigações
              decorrentes destes termos sem o nosso consentimento prévio por
              escrito.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">19. Separabilidade</h2>
            <p className="text-gray-700 leading-relaxed">
              Se qualquer disposição destes termos for considerada inválida ou
              inaplicável, as demais disposições permanecerão em vigor e efeito.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4">20. Acordo Completo</h2>
            <p className="text-gray-700 leading-relaxed">
              Estes termos constituem o acordo completo entre você e nossa
              empresa em relação ao uso do serviço e substituem todos os acordos
              ou entendimentos anteriores, escritos ou verbais.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
