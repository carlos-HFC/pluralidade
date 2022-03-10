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

  &:nth-child(odd) {
    background: ${props => props.theme.login.background};

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

      /* @media (min-width: 768px) and (max-width: 1199.9px) {
        flex-direction: row;

        .card {
          min-width: calc(50% - 2rem);
        }
      }

      .card {
        @media (hover: hover) {
          &:hover {
            &:nth-child(even) {
              background: ${props => props.theme.card.bgHoverSecondary} !important;
            }
            &:nth-child(odd) {
              background: ${props => props.theme.card.bgHoverPrimary} !important;
            }

            h3, p, a {
              color: ${COLORS.white};
            }
          }
        }
      } */
    }
  `}

  /* ${props => props.type === 'events' && css`
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

        @media (hover: hover) {
          &:hover {
            &:nth-child(odd) {
              background: ${props => props.theme.card.bgHoverSecondary} !important;
            }
            &:nth-child(even) {
              background: ${props => props.theme.card.bgHoverPrimary} !important;
            }

            h3, p, a {
              color: ${COLORS.white};
            }
          }
        }
      }
    }
  `}*/

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