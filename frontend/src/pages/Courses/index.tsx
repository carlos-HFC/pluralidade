import { Card, Title } from "../../components";
import { usePluri } from "../../context";

import { CourseContainer, CoursesGrid } from './style';

export function Courses() {
  const { courses } = usePluri();

  return (
    <>
      <Title title="Cursos" />
      <CourseContainer>
        <CoursesGrid>
          {courses.map(course => (
            <Card title={course.name} img={course.image} key={course.id} link="/">
              {course.description}
            </Card>
          ))}
        </CoursesGrid>
      </CourseContainer>
    </>
  );
}