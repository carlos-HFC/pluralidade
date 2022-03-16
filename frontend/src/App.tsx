import { BrowserRouter } from 'react-router-dom';

import { LoaderProvider, PluralityProvider } from './context';
import { Routes } from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';

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