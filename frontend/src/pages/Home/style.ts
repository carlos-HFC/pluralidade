import styled, { css } from "styled-components";

import { COLORS } from '../../styles/variables';

export const HomeContainer = styled.section<{ type: 'courses' | 'aboutus' | 'events'; }>`
  width: 100%;
  padding: 100px 0;

  @media (min-width: 992px) {
    padding: 10rem 0;
  }

  header, footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: inherit;
  }

  header {
    padding-bottom: 5rem;

    h2 {
      color: ${props => props.theme.text};
      transition: color .3s;
      font-size: 2rem;
      font-weight: bold;
    }
  }

  footer {
    padding-top: 5rem;
  }

  &:nth-child(odd) {
    transition: background-color .3s;
    background: ${props => props.theme.card.oddSection};
    
    header {
      h2 {
        color: ${COLORS.white};
      }
    }
  }

  ${props => props.type === 'courses' && css`
    .cards {
      display: flex;
      width: 100%;
      gap: 1rem;
      flex-wrap: wrap;
      flex-direction: column;

      @media (min-width: 1200px) {
        flex-direction: row;
        gap: 2rem;
      }

      @media (min-width: 768px) and (max-width: 1199.9px) {
        flex-direction: row;
      }

      article {
        background: ${props => props.theme.card.backgroundPrimary};
        transition: background-color .3s;
      }
    }
  `}

  ${props => props.type === 'events' && css`
    .cards {
      display: flex;
      width: 100%;
      gap: 2rem;
      flex-wrap: wrap;
      flex-direction: column;

      @media (min-width: 768px) and (max-width: 1199.9px) {
        flex-direction: row;
      }

      @media (min-width: 1200px) {
        flex-direction: row;
        gap: 3rem;
      }

      article {
        background: ${props => props.theme.card.backgroundSecondary};
        transition: background-color .3s;
      }
    }
  `}

  /*${props => props.type === 'aboutus' && css`
    .aboutus {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      @media (min-width: 992px) {
        flex-direction: row;
      }

      .description {
        display: flex;
        font-size: 1.2rem;
        line-height: 2;
        text-align: justify;
        width: 100%;

        @media (min-width: 992px) {
          width: 35%;
        }
      }

      .images {
        gap: 1rem;
        display: flex;
        width: 100%;
        flex-direction: column;

        @media (min-width: 768px) {
          flex-direction: row;
        }

        @media (min-width: 992px) {
          width: 65%;
        }

        figure {
          display: flex;
          margin: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  `} */
`;