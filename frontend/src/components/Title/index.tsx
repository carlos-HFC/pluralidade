import { ReactNode } from "react";
import styled from "styled-components";

import { COLORS, FONTS } from '../../styles/variables';

const Wrapper = styled.div`
  background: ${props => props.theme.pageTitle};
  transition: background-color .3s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16.5rem;
  
  @media (min-width: 992px) {
    height: 25rem;
  }

  h1 {
    color: ${COLORS.white};
    font-weight: bold;
    letter-spacing: .125rem;
    text-align: center;
    font-family: ${FONTS.primary};
    font-size: 2.5rem;

    @media (min-width: 992px) {
      font-size: 3.5rem;
    }
  }
`;

interface TitleProps {
  title: ReactNode;
}

export function Title({ title }: TitleProps) {
  return (
    <Wrapper>
      <h1>{title}</h1>
    </Wrapper>
  );
}