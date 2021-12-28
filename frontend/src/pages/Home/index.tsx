import { lazy, Suspense } from "react";
import { useHistory } from "react-router-dom";

import { Button, Card } from '../../components';

import img from '../../assets/img1.jpg';
import img8 from '../../assets/img8.jpg';
import img9 from '../../assets/img9.jpg';

import { HomeContainer } from './style';

const Carousel = lazy(() => import('../../components/Carousel').then(({ Carousel }) => ({ default: Carousel })));

export function Home() {
  const { push } = useHistory();

  function navigateToPage(page: string) {
    window.scroll({ top: 0, behavior: 'auto' });
    return push(page);
  }

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Carousel />
      </Suspense>

      <HomeContainer type="courses">
        <div className="container">
          <header>
            <h2>Cursos</h2>
          </header>
          <div className="cards">
            <Card img={img} link="ler mais" title="Teste">
              Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.
            </Card>
            <Card img={img} link="ler mais" title="Teste">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam debitis quae facilis officia sunt neque tempora quidem harum earum fugiat nesciunt maxime velit, suscipit sed, totam ad odio repellat natus.
            </Card>
            <Card img={img} link="ler mais" title="Teste">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam debitis quae facilis officia sunt neque tempora quidem harum earum fugiat nesciunt maxime velit, suscipit sed, totam ad odio repellat natus.
            </Card>
            <Card img={img} link="ler mais" title="Teste">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam debiti
            </Card>
            <Card img={img} link="ler mais" title="Teste">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam debitis quae facilis officia sunt neque tempora quidem harum earum fugiat nesciunt maxime velit, suscipit sed, totam ad odio repellat natus.
            </Card>
            <Card img={img} link="/" title="Teste">
              fdafdsafda fugiat nesciunt maxime velit, suscipit sed, totam ad odio repellat natus.
            </Card>
          </div>
          <footer>
            <Button variant="primary">Ver mais Cursos</Button>
          </footer>
        </div>
      </HomeContainer>

      <HomeContainer type="events">
        <div className="container">
          <header>
            <h2>Eventos</h2>
          </header>
          <div className="cards">
            <Card img={img} link="ler mais" title="Teste">
              Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.
            </Card>
            <Card img={img} link="ler mais" title="Teste">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam debitis quae facilis officia sunt neque tempora quidem harum earum fugiat nesciunt maxime velit, suscipit sed, totam ad odio repellat natus.
            </Card>
            <Card img={img} link="ler mais" title="Teste">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam debitis quae facilis officia sunt neque tempora quidem harum earum fugiat nesciunt maxime velit, suscipit sed, totam ad odio repellat natus.
            </Card>
          </div>
          <footer>
            <Button variant="white">Ver mais Eventos</Button>
          </footer>
        </div>
      </HomeContainer>

      <HomeContainer type="aboutus">
        <div className="container">
          <header>
            <h2>Sobre Nós</h2>
          </header>
          <div className="aboutus">
            <div className="description">
              Oferecemos aos nossos alunos a oportunidade de desenvolverem suas competências e habilidades promovendo suas atuações no mundo, levando em consideração suas necessidades individuais, sociais e emocionais.
            </div>
            <div className="images">
              <figure>
                <img src={img8} alt="" loading="lazy" />
              </figure>
              <figure>
                <img src={img9} alt="" loading="lazy" />
              </figure>
            </div>
          </div>
          <footer>
            <Button variant="primary" onClick={() => navigateToPage('/aboutus')}>
              Ver mais Sobre Nós
            </Button>
          </footer>
        </div>
      </HomeContainer>
    </>
  );
}