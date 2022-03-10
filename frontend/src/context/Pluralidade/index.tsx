import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery } from 'react-query';

import { api } from '../../services/api';

import { Courses, Events } from "../../@types";

interface PluralidadeContextProps {
  courses: Courses[];
  events: Events[];
}

interface PluralidadeProviderProps {
  children: ReactNode;
}

export const PluralidadeContext = createContext({} as PluralidadeContextProps);

export const usePluralidade = () => useContext(PluralidadeContext);

export function PluralidadeProvider({ children }: PluralidadeProviderProps) {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [events, setEvents] = useState<Events[]>([]);

  const { data: coursesResponse } = useQuery('courses', async () => {
    const response = await api.get('/courses');
    return response.data;
  }, {
    staleTime: 1000 * 60 * 60
  });

  const { data: eventsResponse } = useQuery('events', async () => {
    const response = await api.get('/events');
    return response.data;
  }, {
    staleTime: 1000 * 60 * 60
  });

  useEffect(() => {
    setCourses(coursesResponse);
    setEvents(eventsResponse);
  }, [coursesResponse, eventsResponse]);

  return (
    <PluralidadeContext.Provider value={{ courses, events }}>
      {children}
    </PluralidadeContext.Provider>
  );
}