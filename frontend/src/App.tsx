import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}