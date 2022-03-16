import { lazy, memo, Suspense, useState } from 'react';
import { Route, Routes as Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { DefaultTheme, ThemeProvider } from 'styled-components';

import * as C from '../components';
import { Loader, LoaderContainer } from "../context/Loader/style";
import * as P from '../pages';

import { GlobalStyle } from '../styles';
import { light, dark } from '../styles/theme';

const Footer = memo(lazy(() => import('../components').then(({ Footer }) => ({ default: Footer }))));

export function Routes() {
  const { pathname } = useLocation();

  const [theme, setTheme] = useState<DefaultTheme>(light);

  const handleTheme = () => setTheme(theme.name === 'dark' ? light : dark);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme={theme.name === 'dark' ? 'dark' : 'colored'} />
      <GlobalStyle />
      {/* {pathname !== '/register' && <Accessibility handleTheme={handleTheme} />} */}
      <C.Accessibility handleTheme={handleTheme} />
      {pathname !== '/register' && <C.Header />}
      <main id="main">
        <Switch>
          <Route path="/" element={<P.Home />} />
          <Route path="/register" element={<P.Register />} />
          <Route path="/aboutus" element={<P.AboutUs />} />
          <Route path="/contact" element={<P.Contact />} />
          <Route path="/courses" element={<P.Courses />} />
          <Route path="/events" element={<P.Events />} />
        </Switch>
      </main>
      <Suspense fallback={<LoaderContainer><Loader /></LoaderContainer>}>
        {pathname !== '/register' && <Footer />}
      </Suspense>
    </ThemeProvider>
  );
}