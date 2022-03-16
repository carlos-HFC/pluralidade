import { darken } from 'polished';
import { createGlobalStyle } from 'styled-components';

import { COLORS } from "./variables";

export const GlobalStyle = createGlobalStyle`
  * {
    transition: color .3s, background-color .3s;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 1.5;
  }

  canvas {
    display: none;
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.buttons.primary};
    border-radius: 0.5rem;
    border: 0.5px solid #eee;
    
    &:hover {
      background: ${props => darken(.05, props.theme.buttons.primary)};
    }
  }

  ::-webkit-scrollbar-track-piece {
    background: #eee;
    box-shadow: 0 0 1.5px ${COLORS.black};
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-size: 1rem;
  }

  .login {
    padding: 40px;
    border-radius: 1rem !important;
    width: 100% !important;
    background: ${props => props.theme.login.background};

    svg {
      color: ${props => props.theme.text};
    }
  }
`;