import HeroImage from '../../assets/clinicaMedica.jpg';

export default function HomeView() {
  return (
    <main className="p-m">
      <img src={HeroImage} className="w-full" />
      <p>
        Bem-vindo à Clínica Saúde Integral, seu parceiro dedicado para cuidados
        médicos abrangentes e personalizados. Nossa equipe altamente qualificada
        de profissionais de saúde está comprometida em fornecer serviços médicos
        de alta qualidade, visando o bem-estar holístico de nossos pacientes.
      </p>
      <section>
        <h2>Missão</h2>
        <p>
          Nossa missão é proporcionar atendimento médico excepcional, centrado
          no paciente, promovendo a saúde e a prevenção de doenças. Buscamos ser
          referência em excelência clínica, oferecendo um ambiente acolhedor e
          compassivo para todos que confiam em nós para sua saúde.
        </p>
      </section>
      <section>
        <h2>Valores</h2>
        <ol>
          <li>
            <strong>Compromisso com o Paciente:</strong> Colocamos o paciente em
            primeiro lugar, dedicando-nos a oferecer cuidados personalizados e
            compassivos.
          </li>
          <li>
            <strong>Excelência Clínica:</strong> Buscamos constantemente
            aprimorar nossos conhecimentos e práticas para fornecer o mais alto
            padrão de cuidado médico.
          </li>
          <li>
            <strong>Ética e Integridade:</strong> Agimos com ética e integridade
            em todos os aspectos de nossa prática, mantendo a confiança de
            nossos pacientes.
          </li>
        </ol>
      </section>
    </main>
  );
}
