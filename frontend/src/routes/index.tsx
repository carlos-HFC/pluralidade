import { memo, useEffect, useState } from 'react';
import { Route, Routes as Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { DefaultTheme, ThemeProvider } from 'styled-components';

import * as C from '../components';
import * as P from '../pages';

import { GlobalStyle } from '../styles';
import { light, dark } from '../styles/theme';

const Aboutus = memo(P.AboutUs);
const Footer = memo(C.Footer);

export function Routes() {
  const { pathname } = useLocation();

  const [theme, setTheme] = useState<DefaultTheme>(light);

  const handleTheme = () => setTheme(theme.name === 'dark' ? light : dark);

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'auto' });
    document.body.style.overflow = "auto";
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme={theme.name === 'dark' ? 'dark' : 'colored'} />
      <GlobalStyle />
      {/* {pathname !== '/register' && <Accessibility handleTheme={handleTheme} />} */}
      <C.Accessibility handleTheme={handleTheme} />
      {pathname !== '/register' && <C.Header />}
      <main id="content">
        <Switch>
          <Route path="/" element={<P.Home />} />
          <Route path="/register" element={<P.Register />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contact" element={<P.Contact />} />
          <Route path="/courses" element={<P.Courses />} />
          <Route path="/events" element={<P.Events />} />
        </Switch>
      </main>
      {pathname !== '/register' && <Footer />}
    </ThemeProvider>
  );
}