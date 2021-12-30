import { lighten } from "polished";
import styled, { css } from "styled-components";

import { COLORS } from '../../styles/variables';

export const AboutUsContainer = styled.section.attrs({ className: "container" })`
  padding: 150px 2rem !important;
  gap: 50px;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    padding: 150px 200px !important;
  }
`;

export const AboutUsDiv = styled.div`
  h3 {
    margin-bottom: 1rem;
    position: relative;
    padding-left: 25px;
    color: ${props => props.theme.text};

    &::before {
      content: "";
      display: flex;
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
    }
  }

  p, strong {
    text-align: justify;
    color: ${props => props.theme.text};
  }
`;

export const AboutUsFigure = styled.figure<{ side: 'right' | 'left'; }>`
  min-width: 50px;
  max-width: 350px;
  width: 50%;
  padding-bottom: 15px;
  margin: 0;
  
  @media (min-width: 768px) {
    width: 100%;
  }
  
  ${props => props.side === 'left' && css`
    float: left;
    padding-right: 15px;
  `}

  ${props => props.side === 'right' && css`
    float: right;
    padding-left: 15px;
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  figcaption {
    text-align: center;
    color: ${props => lighten(.3, props.theme.text)};
    font-size: 0.85rem;
    padding-top: .5rem;
  }
`;