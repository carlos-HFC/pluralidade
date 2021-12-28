import { lighten, transparentize } from 'polished';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import styled, { css } from 'styled-components';

import { COLORS } from '../../styles/variables';

interface InputBlockProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  password?: boolean;
}

const Floating = styled.fieldset`
  border-radius: .5rem;
  border: 1.4px solid ${transparentize(.5, COLORS.black)};
  display: flex;
  position: relative;
  height: 4rem;
  transition: 0.3s;
  background: ${props => props.theme.login.floating};
`;

const Button = styled.button.attrs({ type: 'button' })`
  display: inline-block;
  padding: calc(0.75rem / 2) 1.25rem;
  border: 0;
  border-bottom-right-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  font-size: calc(0.875rem + 2px);
  font-weight: 700;
  transition: filter 0.3s;
  line-height: 1;
  outline: none;
  background: ${props => props.theme.login.button};

  &:hover {
    filter: brightness(0.9);
  }
`;

const Label = styled.label`
  color: ${COLORS.black};
  font-size: 1rem;
  padding: 1.2rem 1rem;
  pointer-events: none;
  position: absolute;
  transition: .3s;
  color: ${props => props.theme.text};
`;

const Input = styled.input<InputBlockProps>`
  background: transparent;
  border: 0;
  padding: 0 1rem;
  height: inherit;
  appearance: none;
  color: ${props => props.theme.text};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: .5rem;
  position: relative;
  width: 100%;
  transition: box-shadow .3s linear, background-color .3s linear;

  &:disabled, &.disabled {
    background: ${props => props.theme.title === 'light' ? transparentize(.75, COLORS.gray) : '#555'};
    cursor: not-allowed;
    color: #fff;
    
    &::placeholder {
      color: #fff;
    }
    
    & ~ ${Label} {
      color: #fff;
    }
  }

  &::-webkit-inner-spin-button {
    display: none;
  }

  ${props => props.password &&
    css`
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    `
  }

  &::placeholder {
    opacity: 0;
  }

  &:focus {
    box-shadow: 0 0 0 2.5px ${lighten(.7, COLORS.black)};
  }

  &:focus,
  &:not(:placeholder-shown) {
    padding-top: 1.5rem;
    outline: none;
    border-radius: 0.5rem;

    ${props => props.password &&
    css`
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      `
  }

    & ~ ${Label} {
      opacity: 0.85;
      transform: scale(0.85) translateY(-1rem) translateX(0.5rem);
    }
  }
`;

export const InputBlock = forwardRef<HTMLInputElement, InputBlockProps>((props, ref) => {
  const [type, setType] = useState('password');

  return (
    <Floating>
      {props.password
        ? (
          <>
            <Input {...props} placeholder={props.label} type={type} />
            <Label htmlFor={props.id}>{props.label}</Label>
            {type === 'password'
              ? <Button title="Mostrar senha" onClick={() => setType('text')}><BsEye /></Button>
              : <Button title="Esconder senha" onClick={() => setType('password')}><BsEyeSlash /></Button>}
          </>
        ) : (
          <>
            <Input {...props} placeholder={props.label} ref={ref} />
            <Label htmlFor={props.id}>{props.label}</Label>
          </>
        )
      }
    </Floating>
  );
});