import { memo, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import * as C from '../components';
import { AboutUs, Home, Register } from '../pages';

import { GlobalStyle } from '../styles';
import { light, dark } from '../styles/theme';

const Footer = memo(C.Footer);

export function Routes() {
  const { pathname } = useLocation();

  const [theme, setTheme] = useState<DefaultTheme>(light);

  const handleTheme = () => setTheme(theme.title === 'dark' ? light : dark);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* {pathname !== '/register' && <Accessibility handleTheme={handleTheme} />} */}
      <C.Accessibility handleTheme={handleTheme} />
      {pathname !== '/register' && <C.Header />}
      <main id="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/aboutus" component={AboutUs} />
        </Switch>
      </main>
      {pathname !== '/register' && <Footer />}
    </ThemeProvider>
  );
}