import { Title } from "../../components";

import accessibility from '../../assets/acessibilidade-web.webp';
import ceo from '../../assets/ceo.webp';
import logo from '../../assets/logo.png';

import { AboutUsContainer, AboutUsDiv, AboutUsFigure } from './style';

export function AboutUs() {
  return (
    <>
      <Title title="Sobre Nós" />
      <AboutUsContainer>
        <AboutUsDiv>
          <h2>Como tudo começou?</h2>
          <AboutUsFigure side="right">
            <img width={864} height={400} loading="lazy" src={ceo} alt="Fundador do Instituto Pluralidade" title="Fundador do Instituto Pluralidade" />
            <figcaption>Arthur Benjamin Martins</figcaption>
          </AboutUsFigure>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque inventore dolorem, quibusdam temporibus reiciendis quo hic blanditiis deleniti distinctio atque, illum doloremque harum deserunt iusto consequatur non iste! Mollitia, velit! Commodi fugiat doloremque eius odio aut nesciunt nulla delectus culpa et consequatur eum consectetur repudiandae quos facere porro, inventore exercitationem laboriosam animi. Itaque dolorum voluptates accusamus alias natus nostrum temporibus?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque inventore dolorem, quibusdam temporibus reiciendis quo hic blanditiis deleniti distinctio atque, illum doloremque harum deserunt iusto consequatur non iste! Mollitia, velit! Commodi fugiat doloremque eius odio aut nesciunt nulla delectus culpa et consequatur eum consectetur repudiandae quos facere porro, inventore exercitationem laboriosam animi. Itaque dolorum voluptates accusamus alias natus nostrum temporibus?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam voluptates vero dignissimos? Natus nam commodi doloremque voluptatibus vel, assumenda nulla magnam corrupti laboriosam dolorem quos voluptate omnis sunt totam nesciunt.
          </p>
        </AboutUsDiv>
        <AboutUsDiv>
          <h2>Nosso Propósito</h2>
          <AboutUsFigure side="left">
            <img width={864} height={400} loading="lazy" src={logo} alt="Logo do Instituto Pluralidade" title="Logo do Instituto Pluralidade" />
            <figcaption>Logo do Instituto</figcaption>
          </AboutUsFigure>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique dicta corporis mollitia autem? Id rerum sequi deserunt, nihil placeat eaque corporis maxime ipsa culpa. Corrupti, animi! Consequuntur ex illo non. Ipsa qui modi ad repellat rem nisi perspiciatis consectetur et dignissimos numquam quibusdam itaque aliquid cum voluptatum veniam totam perferendis repudiandae doloribus iure amet facere, ducimus neque. Assumenda, atque vero.
          </p>
        </AboutUsDiv>
        <AboutUsDiv>
          <h2>Mas o que é acessibilidade na web?</h2>
          <AboutUsFigure side="right">
            <img width={864} height={400} loading="lazy" src={accessibility} alt="Acessibilidade WEB" title="Acessibilidade WEB" />
            <figcaption>União da acessibilidade para todos</figcaption>
          </AboutUsFigure>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod minima officia deserunt accusamus odio et, ad sed, qui explicabo error quaerat obcaecati ipsam autem tempora distinctio at aliquid quas repudiandae?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore labore doloribus et, recusandae qui minima, nulla delectus porro deserunt nemo rem, quis quasi provident aspernatur perspiciatis voluptatibus. Deleniti, sunt similique.
          </p>
        </AboutUsDiv>
      </AboutUsContainer>
    </>
  );
}