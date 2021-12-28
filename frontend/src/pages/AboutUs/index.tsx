import { TitlePage } from "../../components";

import { AboutUsStyle } from './style';

import img1 from '../../assets/img1.jpg';
import logo from '../../assets/logo.png';

export function AboutUs() {
  return (
    <>
      <AboutUsStyle />
      <TitlePage title="SOBRE NÓS" />
      <section className="container">
        <div>
          <h3>Como tudo começou?</h3>
          <figure className="right">
            <img loading="lazy" src={img1} alt="Fundador do Instituto Pluralidade" title="Fundador do Instituto Pluralidade" />
          </figure>
          <p>
            O Instituto foi fundado no dia 23 de agosto de 2018, pelo empresário Thiago Veiga Lima. Thiago, vem de uma família pobre onde era o mais velho de quatro irmãos, e seu irmão mais novo Jonathan é deficiente visual. Vendo a dificuldade de seu irmão e sua mãe no dia a dia, resolveu terminar seus estudos no ensino médio e em seguida entrou no ensino superior, cursando Gestão de Negócios. No terceiro semestre de curso começou a fazer estágio em uma empresa de grande nome e foi conseguindo se promover, até realizar o sonho de ter a sua própria empresa.
          </p>
          <p>
            Em sua empresa adaptou lugares para portadores de necessidades, inclusive para seu irmão. Com esses diferenciais conseguiu alguns patrocínios e decidiu fundar o Instituto.
          </p>
          <p>
            Localizado na Rua Maestro Cardim, 000 - Bela Vista - SP, o Instituto Pluralidade, trata-se de uma instituição de ensino inclusivo preparado para acolher, incluir, socializar, educar e desenvolver crianças, jovens e adultos com ou sem necessidades especiais, buscando promover uma sociedade inclusiva, que garanta a igualdade de direitos e a valorização das diferenças.
          </p>
        </div>
        <div>
          <h3>Nosso Propósito</h3>
          <figure className="left">
            <img loading="lazy" src={logo} alt="Logo do Instituto Pluralidade" title="Logo do Instituto Pluralidade" />
          </figure>
          <p>
            Oferecemos aos nossos alunos a oportunidade de desenvolverem suas competências e habilidades promovendo suas atuações no mundo, levando em consideração suas necessidades individuais, sociais e emocionais. Almejamos ser um centro educacional de referência para pessoas com ou sem necessidades especiais, inovando em propostas, práticas pedagógicas e sobretudo, na formação de cidadãos conscientes das peculiaridades de cada indivíduo. Corroborando assim, o respeito as diferenças, a solidariedade, responsabilidade, a cooperação e autonomia pessoal e coletiva. Denotando um ambiente acolhedor e mais humano no processo de aprendizagem.
          </p>
        </div>
        <div>
          <h3>O que é acessibilidade?</h3>
          <p>
            Segundo o dicionário, acessibilidade é um <abbr title="Substantivo Feminino">s.f.</abbr>, e significa "qualidade ou caráter do que é acessível; facilidade na aproximação, tratamento ou aquisição".
          </p>
          <p>
            Acessibilidade é um atributo essencial do ambiente que garante a melhoria da qualidade de vida das pessoas. Deve estar presente nos espaços, no meio físico, no transporte, na informação e comunicação, inclusive nos sistemas e tecnologias da informação e comunicação, bem como em outros serviços e instalações abertos ao público ou de uso público, tanto na cidade como no campo. Além do mais, atualmente temos a Lei n°10.098/200 que estabelece normas e critérios para promover esses direitos.
          </p>
          <p>
            Esse é um tema ainda pouco discutido, apesar de sua inegável relevância. Considerando que ela gera resultados sociais positivos e contribui para o desenvolvimento inclusivo e sustentável, sua implementação é fundamental, dependendo, porém, de mudanças culturais.
          </p>
        </div>
        <div>
          <h3>Mas o que é acessibilidade na web?</h3>
          <figure className="left">
            <img loading="lazy" src={img1} alt="" title="" />
          </figure>
          <p>
            Acessibilidade na Web significa que pessoas com deficiências podem perceber, entender, navegar e interagir além de poder contribuir para a web. Por isso, fazer um site acessível não é apenas preocupar-se com um determinado grupo de pessoas, mas sim com todas as pessoas que acessem o seu site.
          </p>
          <p>
            Atualmente temos a <strong>WAI (Web Acessibility Initiative - Iniciativa de Acessibilidade na Web)</strong> e a <strong>WCAG (Web Content Accessibility Guidelines - Diretrizes de Acessibilidade ao Conteúdo da Web)</strong>. Ambas trabalham juntas com o <strong>W3C (World Wide Web Consortium - Consórcio da World Wide Web)</strong> que é um consórcio internacional no qual organizações filiadas, uma equipe em tempo integral e o público trabalham juntos para desenvolver padrões para a Web. O valor social da Web está nas novas possibilidades de comunicação humana, comércio e compartilhamento de conhecimentos. Um dos principais objetivos do W3C é tornar esses benefícios disponíveis para todas as pessoas, independente do hardware que utilizam, software, infra-estrutura de rede, idioma, cultura, localização geográfica ou capacidade física e mental.
          </p>
        </div>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7314.096862684385!2d-46.639497!3d-23.566704!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a33f9666e3%3A0xda9e218caa168b75!2sR.%20Maestro%20Cardim%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1640707688869!5m2!1spt-BR!2sbr" title="Mapa com a localização do Instituto Pluralidade" loading="lazy"></iframe>
        </div>
      </section>
    </>
  );
}