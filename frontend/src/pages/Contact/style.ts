import { lighten } from "polished";
import styled from "styled-components";

export const ContactContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 150px 0;

  iframe {
    width: 100%;
    height: 215px;
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
  gap: 2rem;

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

    span {
      color: ${props => props.theme.text};
      
      &:last-child {
        color: ${props => lighten(.5, props.theme.text)};
      }
    }
    
    svg {
      color: ${props => props.theme.text};
      font-size: 1.5rem;
      margin-top: .5rem;
    }
  }
`;