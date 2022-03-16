import { transparentize } from "polished";
import styled from "styled-components";

import { COLORS, FONTS } from "../../styles/variables";

export const AccessibilityWrapper = styled.div`
  width: 100%;
  z-index: 9;
  position: fixed;
  display: flex;
  height: 50px;
  background: #fff;
  box-shadow: 0 2px 5px ${transparentize(.8, '#000')};
`;

export const Container = styled.div.attrs({ className: 'container' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Link = styled.a`
  color: ${COLORS.black};
  text-decoration: underline;
  font-size: 1rem;
  font-family: ${FONTS.secondary};

  @media (hover: hover) {
    &:hover {
      color: ${COLORS.black};
    }
  }
`;

export const Switch = styled.label`
  display: flex;
  align-items: center;

  span {
    border-radius: 1rem;
    background: #fff;
    border: 1px solid ${transparentize(.6, COLORS.gray)};
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    width: 50px;
    height: 1.25rem;
    position: relative;
    box-shadow: 0 2px 4px rgba(0,0,0,.3);
  
    &::before {
      border-radius: 50%;
      background: #f7f7f7;
      border: 1px solid ${transparentize(.6, COLORS.gray)};
      bottom: -.2rem;
      content: "";
      height: 1.5rem;
      left: -.25rem;
      position: absolute;
      transition: 0.2s;
      width: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,.3);
    }
  }

  input {
    height: 0;
    opacity: 0;
    width: 0;

    &:checked + span {
      background: #000;
      border: 1px solid #000;

      &::before {
        transform: translateX(2rem);
      }
    }
  }
`;