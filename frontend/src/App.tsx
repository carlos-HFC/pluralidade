import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.min.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}