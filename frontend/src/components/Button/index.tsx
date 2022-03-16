import { lighten, transparentize } from 'polished';
import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { COLORS, FONTS } from '../../styles/variables';

const colors = {
  primary: COLORS.purpleLight,
  secondary: COLORS.pinkLight,
  success: COLORS.green,
  error: COLORS.red,
  dark: COLORS.black,
  light: lighten(.65, COLORS.gray),
  white: COLORS.white
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'light' | 'dark' | 'white';
  block?: boolean;
};

export const Button = styled.button.attrs({ className: 'btn' }) <ButtonProps>`
  transition: all .25s;
  border-radius: .5rem;
  font-size: 1rem;
  padding: .75rem;
  font-family: ${FONTS.secondary};

  &:hover {
    filter: brightness(.9);
  }

  &:is(:disabled, .disabled) {
    cursor: not-allowed;
    pointer-events: auto;
    opacity: .6;
  }

  ${props => props.theme.name === 'light'
    ? props.variant
      ? css`
        background: ${colors[props.variant]};
        border-color: ${colors[props.variant]};
        color: ${props.variant === 'light' || props.variant === 'white' ? '#212121' : '#fff'} !important;
  
        &:focus {
          border-color: ${colors[props.variant]};
          box-shadow: 0 0 0 .25rem ${transparentize(.5, colors[props.variant])};
        }
      `
      : css`
        background: ${colors.light};
        border-color: ${colors.light};
        color: ${colors.dark};
  
        &:focus {
          border-color: ${colors.light};
          box-shadow: 0 0 0 .25rem ${transparentize(.5, colors.light)};
        }
      `
    : css`
      background: #111;
      border-color: #111;
      color: #fff !important;

      &:focus {
        border-color: #111;
        box-shadow: 0 0 0 .25rem ${transparentize(.5, '#111')};
      }
    `
  }

  ${props => props.block ? 'width: 100%' : 'width: auto'}
`;