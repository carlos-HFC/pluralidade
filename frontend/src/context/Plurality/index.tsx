import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from 'react-query';

import { api } from '../../services/api';

import { Courses, Events } from "../../@types";

interface PluralityContextProps {
  courses: Courses[];
  events: Events[];
}

interface PluralityProviderProps {
  children: ReactNode;
}

const INITIAL_STALE_TIME = 1000 * 60 * 60; // 1 hour

export const PluralityContext = createContext({} as PluralityContextProps);

export const usePlurality = () => useContext(PluralityContext);

export function PluralityProvider({ children }: PluralityProviderProps) {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [events, setEvents] = useState<Events[]>([]);

  const { data } = useQuery(['events', 'courses'], async () => {
    return await Promise.all([
      api.get('/events'),
      api.get('/courses'),
    ]).then(response => {
      return {
        courses: response[1].data,
        events: response[0].data,
      };
    });
  }, {
    staleTime: INITIAL_STALE_TIME
  });

  useEffect(() => {
    setCourses(data?.courses);
    setEvents(data?.events);
  }, [data]);

  return (
    <PluralityContext.Provider value={{ courses, events }}>
      {children}
    </PluralityContext.Provider>
  );
}