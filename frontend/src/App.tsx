import { BrowserRouter } from 'react-router-dom';

import { LoaderProvider, PluralityProvider } from './context';
import { Routes } from './routes';

export function App() {
  return (
    <>
      <LoaderProvider>
        <PluralityProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </PluralityProvider>
      </LoaderProvider>
    </>
  );
}