import { lighten } from 'polished';
import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { COLORS, FONTS } from '../../styles/variables';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'radio' | 'checkbox';
  label: string;
  name: string;
  id: string;
}

const Fieldset = styled.fieldset`
  display: flex;
  align-items: center;
  min-height: 1rem;
  position: relative;
  gap: .75rem;
  line-height: 1.5;
  background: transparent !important;
`;

const Input = styled.input<Pick<RadioButtonProps, 'type'>>`
  background: transparent;
  appearance: none;
  height: 1.25rem;
  width: 1.25rem;
  min-height: 1.25rem;
  min-width: 1.25rem;
  max-height: 1.25rem;
  max-width: 1.25rem;
  outline: none;
  transition: background-color .3s, border-color .3s;
  will-change: background-color, border-color;
  ${props => props.type === 'radio' ? 'border-radius: 50%;' : 'border-radius: .25rem;'}
  ${props => props.theme.name === 'light'
    ? css`
      border: 1px solid ${COLORS.purpleLight};

      &:checked {
        background: ${COLORS.purpleLight}
      }
    ` : css`
      border: 1px solid ${lighten(.25, COLORS.black)};

      &:checked {
        background: ${lighten(.25, COLORS.black)}
      }
    `}
`;

const Label = styled.label`
  display: flex;
  color: ${props => props.theme.text};
  transition: color .3s;
  will-change: color;
  font-family: ${FONTS.secondary};
`;

export const RadioButton = (props: RadioButtonProps) => {
  return (
    <Fieldset title={props.title}>
      <Input {...props} />
      <Label htmlFor={props.id}>{props.label}</Label>
    </Fieldset>
  );
};