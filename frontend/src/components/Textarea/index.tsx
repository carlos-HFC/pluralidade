import { lighten, transparentize } from 'polished';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

import { COLORS, FONTS } from '../../styles/variables';

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
`;

const Label = styled.label`
  font-size: 1rem;
  padding-left: 1rem;
  left: 0;
  top: calc(3.85rem / 3);
  pointer-events: none;
  position: absolute;
  transition: .3s;
  color: ${props => props.theme.text};
  font-family: ${FONTS.secondary};
`;

const TextareaWrapper = styled.textarea<TextareaProps>`
  background: transparent;
  border: 0;
  padding: 0 1rem;
  height: 7.85rem;
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
  font-family: ${FONTS.secondary};

  &:is(:disabled, .disabled) {
    background-color: ${props => props.theme.name === 'light' ? transparentize(.75, COLORS.gray) : '#555'};
    cursor: not-allowed;
    height: inherit;
    
    &, &::placeholder, & ~ ${Label} {
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
      font-size: .85rem;
      transform: translateY(-.85rem);
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