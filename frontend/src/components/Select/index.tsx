import { lighten, transparentize } from 'polished';
import { forwardRef, SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

import { COLORS, FONTS } from '../../styles/variables';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
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

const Label = styled.label`
  font-size: 1rem;
  padding: 1.1rem 1rem;
  pointer-events: none;
  position: absolute;
  transition: .3s;
  color: ${props => props.theme.text};
  font-family: ${FONTS.secondary};
`;

const SelectWrapper = styled.select<SelectProps>`
  background: transparent;
  border: 0;
  padding: 0 1rem;
  height: calc(4rem - 2px);
  appearance: none;
  color: ${props => props.theme.text};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: .5rem;
  position: relative;
  width: 100%;
  transition: box-shadow .3s linear, background-color .3s linear;
  font-family: ${FONTS.secondary};

  option {
    background: ${props => props.theme.login.floating};
    font-family: ${FONTS.secondary};
  }

  &:is(:disabled, .disabled) {
    background-color: ${props => props.theme.name === 'light' ? transparentize(.75, COLORS.gray) : '#555'};
    cursor: not-allowed;
    
    &, &::placeholder, & ~ ${Label} {
      color: #fff;
    }
  }

  &::placeholder {
    opacity: 0;
  }

  &:focus {
    box-shadow: 0 0 0 2.5px ${lighten(.7, COLORS.black)};
  }

  &:focus,
  &:not([value=""]):valid {
    padding-top: 1.5rem;
    outline: none;
    border-radius: 0.5rem;

    & ~ ${Label} {
      opacity: 0.85;
      transform: scale(0.85) translateY(-1rem) translateX(0.5rem);
    }
  }
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return (
    <Floating>
      <SelectWrapper {...props} placeholder={props.label} ref={ref} />
      <Label htmlFor={props.id}>{props.label}</Label>
    </Floating>
  );
});