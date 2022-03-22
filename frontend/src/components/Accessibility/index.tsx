import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTheme } from 'styled-components';

import * as S from './style';

type AccessibilityProps = {
  handleTheme(): void;
};

export function Accessibility({ handleTheme }: AccessibilityProps) {
  const { name } = useTheme();

  const { pathname } = useLocation();

  return (
    <S.AccessibilityWrapper>
      <S.Container>
        {pathname === "/register"
          ? <Link accessKey="h" to="/" title="Home">Home</Link>
          : <a accessKey="m" href="#menu" title="Menu">Menu</a>}
        <a accessKey="c" href="#content" title="Conteúdo">Conteúdo</a>
        <S.Switch title="Mudar tema">
          <input accessKey="s" type="checkbox" onClick={handleTheme} defaultChecked={name === 'dark'} />
          <span />
        </S.Switch>
      </S.Container>
    </S.AccessibilityWrapper>
  );
}