import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { Button, CardCourse, CardEvent } from '../../components';
import { usePlurality } from "../../context";

import img8 from '../../assets/img8.jpg';
import img9 from '../../assets/img9.jpg';

import { HomeContainer } from './style';

const Carousel = lazy(() => import('../../components/Carousel').then(({ Carousel }) => ({ default: Carousel })));

export function Home() {
  const { courses, events } = usePlurality();

  const navigate = useNavigate();

  return (
    <>
      <Suspense fallback={"Loading"}>
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
              <Button variant="primary" onClick={() => navigate('/courses')}>Ver mais Cursos</Button>
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
                <CardEvent key={event.id} img={event.image} link={`/events/${event.id}`} title={event.title} date={format(parseISO(String(event.date)), "dd MMM", { locale: ptBR })}>
                  {event.shortDescription}
                </CardEvent>
              ))}
            </div>
            <footer>
              <Button variant="white" onClick={() => navigate('/events')}>Ver mais Eventos</Button>
            </footer>
          </div>
        </HomeContainer>
      )}

      {/* <HomeContainer type="aboutus">
        <div className="container">
          <header>
            <h2>Sobre N??s</h2>
          </header>
          <div className="aboutus">
            <div className="description">
              Oferecemos aos nossos alunos a oportunidade de desenvolverem suas compet??ncias e habilidades, promovendo suas atua????es no mundo, levando em considera????o suas necessidades individuais, sociais e emocionais.
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
            <Button variant="primary" onClick={() => navigate('/aboutus')}>
              Ver mais Sobre N??s
            </Button>
          </footer>
        </div>
      </HomeContainer> */}
    </>
  );
}