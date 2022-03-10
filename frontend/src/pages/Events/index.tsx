import { Card, Title } from '../../components';
import { usePluralidade } from "../../context";

import { EventsContainer, EventsGrid } from "./style";

export function Events() {
  const { events } = usePluralidade();

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