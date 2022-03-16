import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Title } from '../../components';
import { usePlurality } from "../../context";

import { Event, EventsContainer, EventsGrid } from "./style";

export function Events() {
  const { events } = usePlurality();

  return (
    <>
      <Title title="Eventos" />
      <EventsContainer>
        <EventsGrid>
          {events?.map(event => (
            <Event key={event.id}>
              <figure>
                <img src={event.image} alt={event.title} loading="lazy" draggable="false" />
              </figure>
              <div>
                <div className="date">
                  <span className="date__number">
                    {format(parseISO(String(event.date)), "dd", { locale: ptBR })}
                  </span>
                  <span className="date__month">
                    {format(parseISO(String(event.date)), "MMM", { locale: ptBR })}
                  </span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.shortDescription}</p>
              </div>
            </Event>
          ))}
        </EventsGrid>
      </EventsContainer>
    </>
  );
}