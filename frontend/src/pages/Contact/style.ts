import { lighten } from "polished";
import styled from "styled-components";

import { FONTS } from "../../styles/variables";

export const ContactContainer = styled.section.attrs({ className: "container" })`
  display: flex;
  padding: 4rem 1rem !important;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 992px) {
    gap: 3rem;
    padding: 10rem 1rem !important;
    flex-direction: row;
  }

  .contact {
    width: 100%;

    @media (min-width: 992px) {
      width: 35%;
    }
  }

  .form {
    width: 100%;

    @media (min-width: 992px) {
      width: 65%;
    }
  }
`;

export const ContactData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  input, textarea {
    background: ${props => props.theme.card.backgroundPrimary};
    transition: background-color .3s;
  }

  .form {
    &__inputs { 
      display: flex;
      width: 100%;
      gap: 1rem;
      flex-direction: column;
      
      @media (min-width: 992px) {
        flex-direction: row;
      }

      fieldset {
        width: 100%
      }
    }
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  gap: .75rem;

  @media (min-width: 992px) {
    gap: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    span, a {
      color: ${props => props.theme.text};
      transition: color .3s;
      font-family: ${FONTS.secondary};
      text-decoration: none;
      font-size: .9rem;
      font-style: normal;
      
      @media (min-width: 992px) {
        font-size: 1rem;
      }
      
      &:last-child {
        color: ${props => lighten(.2, props.theme.text)};
        transition: color .3s;
      }
    }

    a {
      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
    }
    
    svg {
      color: ${props => props.theme.text};
      transition: color .3s;
      font-size: 1.5rem;
      margin-top: .5rem;
    }
  }
`;