import { transparentize } from 'polished';
import styled from "styled-components";

import { COLORS } from "../../styles/variables";

export const Slider = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    height: 700px;
  }
`;

export const Prev = styled.div`
  top: 0;
  bottom: 0;
  width: 15%;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  background-image: linear-gradient(to right, #000, transparent);

  button {
    border: 0;
    font-size: 0;
    background: transparent;
    width: 50vw;
    height: 80%;
    outline: none;

    svg {
      color: rgba(255, 255, 255, 0.2);
      font-size: 4rem;
      @media (min-width: 768px) {
        font-size: 8rem;
      }
    }
  }
`;

export const Next = styled.div`
  top: 0;
  bottom: 0;
  width: 15%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  background-image: linear-gradient(to left, #000, transparent);
  justify-content: flex-end;

  button {
    border: 0;
    font-size: 0;
    background: transparent;
    width: 50vw;
    height: 80%;
    outline: none;

    svg {
      color: rgba(255, 255, 255, 0.2);
      font-size: 4rem;
      @media (min-width: 768px) {
        font-size: 8rem;
      }
    }
  }
`;

export const Images = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: relative;
`;

export const Image = styled.div<{ active?: boolean; }>`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  transition: opacity 1.5s;

  ${props => props.active && 'opacity: 1;'}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: optimizeQuality;
  }
`;

export const Dots = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  bottom: 1rem;
  width: 100%;
  display: none;

  @media (min-width: 768px) {
    gap: 1rem;
  }

  @media (min-width: 375px) {
    display: flex;
  }
`;

export const Dot = styled.span<{ active?: boolean; }>`
  background: ${transparentize(.5, '#fff')};
  cursor: pointer;
  width: 40px;
  height: 3px;
  transition: background-color 0.3s;
  @media (min-width: 768px) {
    height: 4px;
    width: 80px;
  }

  ${props => props.active && `background: ${COLORS.purple};`}
`;