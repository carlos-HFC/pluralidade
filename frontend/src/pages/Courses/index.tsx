import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BsCalendarDate } from "react-icons/bs";

import { Title } from "../../components";
import { usePlurality } from "../../context";
import { showPeriod } from "../../utils";

import { Course, CourseContainer, CoursesGrid } from './style';

export function Courses() {
  const { courses } = usePlurality();

  return (
    <>
      <Title title="Cursos" />
      <CourseContainer>
        <CoursesGrid>
          {courses?.map(course => (
            <Course key={course.id}>
              <figure>
                <img src={course.image} alt={course.name} loading="lazy" draggable="false" width={864} height={400} />
              </figure>
              <div>
                <h2>{course.name}</h2>
                <p>{course.shortDescription}</p>
                <time>
                  <span>
                    <BsCalendarDate /> {format(parseISO(String(course.initDate)), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                  </span>
                  <span>
                    Período: {showPeriod(course.period)}
                  </span>
                </time>
              </div>
            </Course>
          ))}
        </CoursesGrid>
      </CourseContainer>
    </>
  );
}