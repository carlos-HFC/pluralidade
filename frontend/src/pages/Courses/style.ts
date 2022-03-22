import { lighten, transparentize } from "polished";
import styled from "styled-components";

import { FONTS } from "../../styles/variables";

export const CourseContainer = styled.section.attrs({ className: 'container' })`
  display: flex;
  flex-direction: column;
  padding: 4rem 1rem !important;

  @media (min-width: 992px) {
    padding: 10rem 1rem !important;
  }
`;

export const CoursesGrid = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
`;

export const Course = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 0.25rem;
  box-shadow: 0 .125rem .5rem ${transparentize(.2, '#000')};
  background: ${props => props.theme.card.backgroundPrimary};
  transition: background-color .3s;
  width: 100%;
  min-width: 100%;
  cursor: pointer;

  @media (min-width: 992px) {
    min-width: calc(100% / 2 - 1.5rem);
    max-width: calc(100% / 2 - 1.5rem);

    @media (hover: hover) {
      &:hover {
        img {
          transform: scale(1.05);
          opacity: 1;
        }
      }
    }
  }

  @media (min-width: 1199px) {
    min-width: calc(100% / 3 - 1.5rem);
    max-width: calc(100% / 3 - 1.5rem);
  }

  figure {
    overflow: hidden;
    height: 10rem;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
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
      will-change: opacity, transform;

      @media (min-width: 992px) and (hover: hover) {
        opacity: 0.8;
      }
    }
  }

  div {
    position: relative;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    user-select: none;

    @media (min-width: 992px) {
      padding: 1.5rem;
    }

    h2 {
      font-weight: 500;
      font-size: 1.5rem;
      color: ${props => props.theme.text};
      transition: color .3s;

      @media (min-width: 992px) {
        font-size: 1.75rem;
      }
    }

    p {
      margin: 0;
      font-family: ${FONTS.secondary};
      color: ${props => props.theme.text};
      transition: color .3s;
      font-size: 0.85rem;
      flex: 1;

      @media (min-width: 992px) {
        font-size: 1rem;
      }
    }

    time {
      padding-top: .5rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: .5rem;
      
      @media (min-width: 320px) {
        flex-direction: row;
      }

      span {
        color: ${props => lighten(.2, props.theme.text)};
        transition: color .3s;
        gap: .5rem;
        display: flex;
        align-items: center;
        font-family: ${FONTS.primary};
        font-size: .9rem;

        svg {
          fill: ${props => lighten(.2, props.theme.text)};
          transition: fill .3s;
          font-size: 1rem;
        }
      }
    }
  }
`;