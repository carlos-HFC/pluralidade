import { lighten } from "polished";
import styled from "styled-components";

import { FONTS } from "../../styles/variables";

export const ContactContainer = styled.section.attrs({ className: "container" })`
  display: flex;
  flex-direction: column;
  padding: 100px .75rem;

  @media (min-width: 992px) {
    padding: 150px 0;
  }

  iframe {
    width: 100%;
    height: 200px;
    border: 0;
    padding-bottom: 3rem;

    @media (min-width: 768px) {
      height: 450px;
    }
  }
`;

export const ContactData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input, textarea {
    background: ${props => props.theme.card.backgroundPrimary};
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    span, a {
      color: ${props => props.theme.text};
      font-family: ${FONTS.secondary};
      text-decoration: none;
      
      &:last-child {
        color: ${props => lighten(.5, props.theme.text)};
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
      font-size: 1.5rem;
      margin-top: .5rem;
    }
  }
`;