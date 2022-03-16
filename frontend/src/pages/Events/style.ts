import styled from "styled-components";

import { COLORS, FONTS } from "../../styles/variables";

export const EventsContainer = styled.section.attrs({ className: "container" })`
  padding: 100px .75rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    padding: 150px .75rem;
  }
`;

export const Event = styled.article`
  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem;
    border-radius: .25rem;
    box-shadow: 0 .125rem .5rem rgba(0,0,0,.2);
    background: ${props => props.theme.card.backgroundPrimary};

    @media (hover: hover) {
      &:hover {
        img {
          transform: scale(1.05);
          opacity: 1;
        }
      }
    }
  }

  figure {
    overflow: hidden;
    height: 15rem;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    position: relative;
    margin: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .5s, opacity .3s;
      
      @media (min-width: 992px) and (hover: hover) {
        opacity: 0.8;
      }
    }
  }

  div {
    position: relative;
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .date {
      margin: 0;
      position: absolute;
      left: 2rem;
      top: -4.5rem;
      padding: .75rem 1.5rem;
      text-align: center;
      gap: 0;
      color: ${COLORS.white};
      background: ${props => props.theme.header};
      border-radius: .25rem;

      &__number, &__month {
        color: ${COLORS.white};
        font-family: ${FONTS.primary};
        background: ${props => props.theme.header};
        text-transform: capitalize;
      }
      
      &__number {
        font-weight: bold;
        font-size: 1.5rem;
      }
      
      &__month {
        font-size: 1rem;
      }
    }


    h3 {
      margin: 0;
      font-family: ${FONTS.primary};
      font-weight: bold;
      font-size: 2rem;
      color: ${props => props.theme.text};
    }
    
    p {
      margin: 0;
      font-family: ${FONTS.secondary};
      font-size: 1rem;
      color: ${props => props.theme.text};
    }
  }
`;

export const EventsGrid = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  flex-wrap: wrap;

  ${Event} {
    @media (min-width: 992px) {
      min-width: calc(50% - 1.5rem);
      max-width: calc(50% - 1.5rem);
      width: 100%;
    }
  }
`;