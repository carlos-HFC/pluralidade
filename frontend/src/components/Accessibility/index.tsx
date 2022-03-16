import { useTheme } from 'styled-components';

import * as S from './style';

type AccessibilityProps = {
  handleTheme(): void;
};

export function Accessibility({ handleTheme }: AccessibilityProps) {
  const { name } = useTheme();

  return (
    <S.AccessibilityWrapper>
      <S.Container>
        <S.Link href="#menu" title="Menu">Menu</S.Link>
        <S.Link href="#main" title="Conteúdo">Conteúdo</S.Link>
        <S.Switch title="Mudar tema">
          <input type="checkbox" onClick={handleTheme} defaultChecked={name === 'dark'} />
          <span />
        </S.Switch>
      </S.Container>
    </S.AccessibilityWrapper>
  );
}