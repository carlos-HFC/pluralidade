import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { Button, CardCourse, CardEvent } from '../../components';
import { usePlurality } from "../../context";
import { Loader, LoaderContainer } from "../../context/Loader/style";

import img8 from '../../assets/img8.jpg';
import img9 from '../../assets/img9.jpg';

import { HomeContainer } from './style';

const Carousel = lazy(() => import('../../components/Carousel').then(({ Carousel }) => ({ default: Carousel })));

export function Home() {
  const { courses, events } = usePlurality();

  const navigate = useNavigate();

  function navigateToPage(page: string) {
    window.scroll({ top: 0, behavior: 'auto' });
    return navigate(page);
  }

  return (
    <>
      <Suspense fallback={<LoaderContainer><Loader /></LoaderContainer>}>
        <Carousel />
      </Suspense>

      {courses?.length > 0 && (
        <HomeContainer type="courses">
          <div className="container">
            <header>
              <h2>Cursos</h2>
            </header>
            <div className="cards">
              {courses.slice(0, 3).map(course => (
                <CardCourse key={course.id} img={course.image} link={`/courses/${course.id}`} title={course.name}>
                  {course.shortDescription}
                </CardCourse>
              ))}
            </div>
            <footer>
              <Button variant="primary" onClick={() => navigateToPage('/courses')}>Ver mais Cursos</Button>
            </footer>
          </div>
        </HomeContainer>
      )}

      {events?.length > 0 && (
        <HomeContainer type="events">
          <div className="container">
            <header>
              <h2>Eventos</h2>
            </header>
            <div className="cards">
              {events.slice(0, 2).map(event => (
                <CardEvent key={event.id} img={event.image} link={`/events/${event.id}`} title={event.title} date={format(parseISO(String(event.date)), "dd MMMM", { locale: ptBR })}>
                  {event.shortDescription}
                </CardEvent>
              ))}
            </div>
            <footer>
              <Button variant="white" onClick={() => navigateToPage('/events')}>Ver mais Eventos</Button>
            </footer>
          </div>
        </HomeContainer>
      )}

      {/* <HomeContainer type="aboutus">
        <div className="container">
          <header>
            <h2>Sobre Nós</h2>
          </header>
          <div className="aboutus">
            <div className="description">
              Oferecemos aos nossos alunos a oportunidade de desenvolverem suas competências e habilidades, promovendo suas atuações no mundo, levando em consideração suas necessidades individuais, sociais e emocionais.
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
      </HomeContainer> */}
    </>
  );
}