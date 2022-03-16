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
  height: 1rem;
  width: 1rem;
  min-height: 1rem;
  min-width: 1rem;
  max-height: 1rem;
  max-width: 1rem;
  outline: none;
  transition: background-color .3s;
  ${props => props.type === 'radio' ? 'border-radius: 50%;' : 'border-radius: .25rem;'}
  ${props => props.theme.name === 'light'
    ? css`
      border: 1px solid ${COLORS.purpleLight};

      &:checked {
        background: ${COLORS.purpleLight}
      }
    `: css`
      border: 1px solid ${lighten(.25, COLORS.black)};

      &:checked {
        background: ${lighten(.25, COLORS.black)}
      }
    `
  }
`;

const Label = styled.label`
  display: flex;
  color: ${props => props.theme.text};
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