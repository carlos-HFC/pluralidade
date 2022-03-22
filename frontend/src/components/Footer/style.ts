import styled, { css, keyframes } from "styled-components";

import { FONTS } from "../../styles/variables";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const socials = ['facebook', 'twitter', 'instagram'];

export const FooterWrapper = styled.footer`
  margin-top: auto;
  padding: 2rem;
  background: ${props => props.theme.footer};
  transition: background-color .3s;
  will-change: background-color;

  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;

    &:last-child {
      border-top: 1px solid #cfcfcf;
    }

    @media (min-width: 768px) {
      padding: 2rem;
      flex-direction: row;
    }
  }

  .copy {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    align-items: center;
    text-align: center;
    font-family: ${FONTS.primary};
    font-size: .8rem;

    span {
      color: ${props => props.theme.text};
      transition: color .3s;
      will-change: color;

      svg {
        animation: 1.5s ${pulse} infinite;
        margin: 0 5px;
      }
    }
  }

  ${props => socials.map(social => css`
    .${social} {
      position: relative;
      transition: transform 0.5s;
      will-change: transform;
      cursor: pointer;
      line-height: 0;
      padding: 1rem;
      border-radius: 1rem;

      span {
        transition: opacity 0.5s, transform 0.75s, color .3s;
        will-change: opacity, transform;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        transform: translateY(-40%);
        opacity: 0;
        color: ${props.theme.text};
        font-family: ${FONTS.primary};
      }

      @media (hover: hover) {
        &:hover {
          & {
            transform: translateY(-25%);
          }

          span {
            transform: translateY(5%);
            opacity: 1;
          }
        }
      }

      svg {
        fill: #fff;
      }
    }
  `)};

  .facebook {
    background: ${props => props.theme.socials.facebook};
    transition: background-color .3s;
    will-change: background-color;
  }
  
  .twitter {
    background: ${props => props.theme.socials.twitter};
    transition: background-color .3s;
    will-change: background-color;
  }
  
  .instagram {
    background: ${props => props.theme.socials.instagram};
    transition: background-color .3s;
    will-change: background-color;
  }
`;

export const FooterCols = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: 0;
  }

  img {
    width: 8.75rem;
    height: 100%
  }
`;