import { createContext, ReactNode, useContext, useState } from "react";

import { Loader, LoaderContainer } from './style';

interface LoaderContextProps {
  handleLoader(load: boolean): void;
}

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderContext = createContext({} as LoaderContextProps);

export const useLoader = () => useContext(LoaderContext);

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [loader, setLoader] = useState(false);

  const handleLoader = (load: boolean) => setLoader(load);

  return (
    <LoaderContext.Provider value={{ handleLoader }}>
      {children}
      {loader && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
    </LoaderContext.Provider>
  );
}