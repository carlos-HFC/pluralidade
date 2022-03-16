import { ReactNode } from "react";
import styled from "styled-components";

import { COLORS, FONTS } from '../../styles/variables';

const Wrapper = styled.div`
  background: ${props => props.theme.pageTitle};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  
  @media (min-width: 992px) {
    height: 400px;
  }

  h1 {
    color: ${COLORS.white};
    font-weight: bold;
    letter-spacing: .75px;
    text-align: center;
    padding: 10px;
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