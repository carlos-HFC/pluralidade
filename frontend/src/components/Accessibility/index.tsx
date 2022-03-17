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
          ? <Link to="/" title="Home">Home</Link>
          : <S.Link href="#menu" title="Menu">Menu</S.Link>}

        <S.Link href="#main" title="Conteúdo">Conteúdo</S.Link>
        <S.Switch title="Mudar tema">
          <input type="checkbox" onClick={handleTheme} defaultChecked={name === 'dark'} />
          <span />
        </S.Switch>
      </S.Container>
    </S.AccessibilityWrapper>
  );
}