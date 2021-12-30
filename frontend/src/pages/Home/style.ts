import styled, { css } from "styled-components";

import { COLORS } from '../../styles/variables';

export const HomeContainer = styled.section<{ type: 'courses' | 'aboutus' | 'events'; }>`
  width: 100%;
  padding: 100px 0;

  * {
    color: ${props => props.theme.text};
  }

  @media (min-width: 768px) {
    padding: 150px 0;
  }

  header, footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: inherit;
  }

  header {
    padding-bottom: 5rem;
  }

  footer {
    padding-top: 5rem;
  }

  ${props => props.type === 'courses' && css`
    .cards {
      display: grid;
      grid-template-rows: auto;
      gap: 2rem;

      @media (min-width: 768px) and (max-width: 1199.9px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
      }
    }
  `}

  ${props => props.type === 'events' && css`
    background: ${props => props.theme.login.background};

    h2 {
      color: ${COLORS.white};
    }

    .cards {
      display: flex;
      width: 100%;
      gap: 2rem;
      flex-wrap: wrap;
      flex-direction: column;

      @media (min-width: 768px) and (max-width: 1199.9px) {
        flex-direction: row;

        .card {
          min-width: calc(50% - 2rem);
        }
      }

      @media (min-width: 1200px) {
        flex-direction: row;
        gap: 3rem;
      }

      .card {
        background: ${props => props.theme.card.backgroundEvents};
      }
    }
  `}

  ${props => props.type === 'aboutus' && css`
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
  `}
`;