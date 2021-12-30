import { ReactNode } from "react";
import styled from "styled-components";

import { COLORS } from '../../styles/variables';

const Wrapper = styled.div`
  background: ${props => props.theme.titlePage};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const Heading = styled.h1`
  color: ${COLORS.white};
  font-weight: bold;
  font-size: 3.5rem;
  letter-spacing: .75px;
  text-align: center;
  padding: 10px;
`;

interface TitleProps {
  title: ReactNode;
}

export function Title({ title }: TitleProps) {
  return (
    <Wrapper>
      <Heading>{title}</Heading>
    </Wrapper>
  );
}