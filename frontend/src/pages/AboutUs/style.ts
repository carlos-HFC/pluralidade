import { lighten } from "polished";
import styled, { css } from "styled-components";

import { COLORS, FONTS } from '../../styles/variables';

export const AboutUsContainer = styled.section.attrs({ className: "container" })`
  padding: 4rem 1rem !important;
  gap: 3rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    padding: 10rem 12.5rem !important;
  }
`;

export const AboutUsDiv = styled.div`
  h2 {
    display: flex;
    position: relative;
    padding-left: 0;
    color: ${props => props.theme.text};
    transition: color .3s;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    
    @media (min-width: 992px) {
      margin-bottom: 1.5rem;
      font-size: 1.75rem;
      padding-left: 1.5rem;
    }

    &::before {
      content: "";
      display: none;
      width: 10px;
      height: 10px;
      background: ${lighten(.3, COLORS.gray)};
      left: 0;
      position: absolute;
      justify-content: center;
      align-items: center;
      margin-right: 50px;
      border-radius: 50%;
      top: 40%;

      @media (min-width: 992px) {
        display: flex;
      }
    }
  }

  p {
    color: ${props => props.theme.text};
    transition: color .3s;
    font-family: ${FONTS.secondary};
    margin: 0;
    font-size: .9rem;

    @media (min-width: 992px) {
      font-size: 1rem;
    }
  }
`;

export const AboutUsFigure = styled.figure<{ side: 'right' | 'left'; }>`
  min-width: 3rem;
  max-width: 21.5rem;
  width: 50%;
  padding-bottom: .8rem;
  margin: 0;
  
  @media (min-width: 768px) {
    width: 100%;
  }
  
  ${props => props.side === 'left' && css`
    float: left;
    padding-right: 1rem;

    @media (min-width: 992px) {
      padding-right: 2rem;
    }
  `}

  ${props => props.side === 'right' && css`
    float: right;
    padding-left: 1rem;

    @media (min-width: 992px) {
      padding-left: 2rem;
    }
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  figcaption {
    text-align: center;
    color: ${props => lighten(.3, props.theme.text)};
    font-size: 0.8rem;
    padding-top: .5rem;
    font-family: ${FONTS.secondary};
  }
`;