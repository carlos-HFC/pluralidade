import { CardCourse, Title } from "../../components";
import { usePlurality } from "../../context";

import { CourseContainer, CoursesGrid } from './style';

export function Courses() {
  const { courses } = usePlurality();

  return (
    <>
      <Title title="Cursos" />
      <CourseContainer>
        <CoursesGrid>
          {courses?.map(course => (
            <CardCourse title={course.name} img={course.image} key={course.id} link="/">
              {course.description}
            </CardCourse>
          ))}
        </CoursesGrid>
      </CourseContainer>
    </>
  );
}