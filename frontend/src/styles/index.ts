import { darken, transparentize } from 'polished';
import { createGlobalStyle } from 'styled-components';

import { COLORS, FONTS } from "./variables";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 1.5;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 992px) {
      max-width: 960px;
    }
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
    @media (min-width: 1400px) {
      max-width: 1342px;
    }
  }

  body {
    background: ${props => props.theme.background};
    transition: background-color .3s;
    will-change: background-color;
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
    transition: background-color .3s;
    
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

  .login {
    border-radius: 1rem !important;
    background: ${props => props.theme.login.background};
    transition: background-color .3s;
    padding: 1.5rem;
    outline: 0ch;

    @media (min-width: 992px) {
      padding: 2rem 4rem;
    }

    .close {
      display: flex;
      justify-content: flex-end;
      
      svg {
        fill: ${props => props.theme.text};
        transition: fill .3s;
      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${FONTS.primary};
    margin: 0;
  }

  .ReactModal {
    &__Overlay {
      opacity: 0;
      transition: opacity .2s ;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      
      &--after-open {
        opacity: 1;
        background: ${transparentize(.5, '#000')} !important;
      }

      &--before-close {
        opacity: 0;
      }
    }
  }
`;