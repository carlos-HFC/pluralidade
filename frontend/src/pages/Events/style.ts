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
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: .75rem;
  border-radius: .25rem;
  box-shadow: 0 .125rem .5rem rgba(0,0,0,.2);
  background: ${props => props.theme.card.backgroundPrimary};

  @media (min-width: 992px) {
    gap: 1rem;

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
    height: 10rem;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    position: relative;
    margin: 0;

    @media (min-width: 992px) {
      height: 15rem;
    }

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
    padding: 1.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;

    @media (min-width: 992px) {
      padding: 2.5rem 2rem;
      gap: 1rem;
    }

    .date {
      margin: 0;
      position: absolute;
      left: 1rem;
      top: -3rem;
      padding: .5rem 1rem;
      text-align: center;
      gap: 0;
      color: ${COLORS.white};
      background: ${props => props.theme.header};
      border-radius: .25rem;
      
      @media (min-width: 992px) {
        left: 2rem;
        top: -4.5rem;
        padding: .75rem 1.5rem;
      }

      &__number, &__month {
        color: ${COLORS.white};
        font-family: ${FONTS.primary};
        background: ${props => props.theme.header};
        text-transform: capitalize;
      }
      
      &__number {
        font-weight: bold;
        font-size: 1rem;
        
        @media (min-width: 992px) {
          font-size: 1.5rem;
        }
      }
      
      &__month {
        font-size: .8rem;

        @media (min-width: 992px) {
          font-size: 1rem;
        }
      }
    }


    h3 {
      margin: 0;
      font-family: ${FONTS.primary};
      font-weight: bold;
      font-size: 1.5rem;
      color: ${props => props.theme.text};
      
      @media (min-width: 992px) {
        font-size: 2rem;
      }
    }
    
    p {
      margin: 0;
      font-family: ${FONTS.secondary};
      color: ${props => props.theme.text};
      font-size: .85rem;
      
      @media (min-width: 992px) {
        font-size: 1rem;
      }
    }
  }
`;

export const EventsGrid = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
  
  @media (min-width: 992px) {
    gap: 3rem;
  }

  ${Event} {
    width: 100%;

    @media (min-width: 992px) {
      min-width: calc(50% - 1.5rem);
      max-width: calc(50% - 1.5rem);
    }
  }
`;