import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { AccessibilityStyle } from './style';

type AccessibilityProps = {
  handleTheme(): void;
};

export function Accessibility({ handleTheme }: AccessibilityProps) {
  const { title } = useContext(ThemeContext);

  return (
    <>
      <AccessibilityStyle />
      <div className="accessibility">
        <div className="container">
          <a href="#menu" title="Menu">Menu</a>
          <a href="#main" title="Conteúdo">Conteúdo</a>
          <label className="switch" title="Mudar tema">
            <input type="checkbox" className="switch__check" onClick={handleTheme} defaultChecked={title === 'dark'} />
            <span className="switch__slider" />
          </label>
        </div>
      </div>
    </>
  );
}