import { memo, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import * as C from '../components';
import * as P from '../pages';

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
          <Route exact path="/" component={P.Home} />
          <Route exact path="/register" component={P.Register} />
          <Route exact path="/aboutus" component={P.AboutUs} />
          <Route exact path="/contact" component={P.Contact} />
          <Route exact path="/courses" component={P.Courses} />
          <Route exact path="/events" component={P.Events} />
        </Switch>
      </main>
      {pathname !== '/register' && <Footer />}
    </ThemeProvider>
  );
}