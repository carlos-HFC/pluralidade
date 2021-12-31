import { Card, Title } from '../../components';
import { usePluri } from "../../context";

import { EventsContainer, EventsGrid } from "./style";

export function Events() {
  const { events } = usePluri();

  return (
    <>
      <Title title="Eventos" />
      <EventsContainer>
        <EventsGrid>
          {events.map(event => (
            <Card title={event.title} img={event.image} key={event.id} link="/">
              {event.description}
            </Card>
          ))}
        </EventsGrid>
      </EventsContainer>
    </>
  );
}