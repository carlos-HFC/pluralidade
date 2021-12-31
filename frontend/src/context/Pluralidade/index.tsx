import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { api } from '../../services/api';

import { Courses, Events } from "../../@types";

interface PluriContextProps {
  courses: Courses[];
  events: Events[];
}

interface PluriProviderProps {
  children: ReactNode;
}

export const PluralidadeContext = createContext({} as PluriContextProps);

export const usePluri = () => useContext(PluralidadeContext);

export function PluralidadeProvider({ children }: PluriProviderProps) {
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/courses'),
      api.get('/events'),
    ]).then(response => {
      setCourses(response[0].data);
      setEvents(response[1].data);
    });
  }, []);

  return (
    <PluralidadeContext.Provider value={{ courses, events }}>
      {children}
    </PluralidadeContext.Provider>
  );
}