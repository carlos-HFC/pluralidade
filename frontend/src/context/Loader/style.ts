import { transparentize } from "polished";
import styled, { keyframes } from "styled-components";

import { COLORS } from "../../styles/variables";

const rotate = keyframes`
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: ${transparentize(.5, COLORS.black)};
  position: fixed;
`;


export const Loader = styled.div`
  background: transparent;
  width: 100px;
  height: 100px;
  border: 10px solid ${COLORS.white};
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;