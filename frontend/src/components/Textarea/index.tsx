import { lighten, transparentize } from 'polished';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../styles/variables';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Floating = styled.fieldset`
  border-radius: .5rem;
  border: 1.4px solid ${transparentize(.5, COLORS.black)};
  display: flex;
  position: relative;
  height: 8rem;
  transition: 0.3s;
  background: ${props => props.theme.login.floating};
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

const TextareaWrapper = styled.textarea<TextareaProps>`
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
  resize: none;
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

  &::placeholder {
    opacity: 0;
  }

  &:focus {
    box-shadow: 0 0 0 2.5px ${lighten(.7, COLORS.black)};
  }

  &:focus,
  &:not(:placeholder-shown) {
    padding-top: 2rem;
    outline: none;
    border-radius: 0.5rem;

    & ~ ${Label} {
      opacity: 0.85;
      transform: scale(0.85) translateY(-1rem) translateX(0.5rem);
    }
  }
`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  return (
    <Floating>
      <TextareaWrapper {...props} placeholder={props.label} ref={ref} />
      <Label htmlFor={props.id}>{props.label}</Label>
    </Floating>
  );
});