import { Card, Title } from '../../components';

import { EventsContainer, EventsGrid } from "./style";

export function Events() {
  return (
    <>
      <Title title="Eventos" />
      <EventsContainer>
        <EventsGrid>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card title="Teste" img="" key={i} link="/">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non in provident consequuntur deleniti qui ad quam quo! Similique eveniet porro fugit incidunt voluptas maxime iusto consequuntur inventore. Nemo, earum repellendus.
            </Card>
          ))}
        </EventsGrid>
      </EventsContainer>
    </>
  );
}