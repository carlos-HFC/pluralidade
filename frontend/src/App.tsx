import { BrowserRouter } from 'react-router-dom';

import { LoaderProvider, PluralidadeProvider } from './context';
import { Routes } from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  return (
    <>
      <LoaderProvider>
        <PluralidadeProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </PluralidadeProvider>
      </LoaderProvider>
    </>
  );
}