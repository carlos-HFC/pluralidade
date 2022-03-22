import styled from "styled-components";

import { FONTS } from "../../styles/variables";

export const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  gap: 1.5rem;

  @media (min-width: 992px) {
    gap: 2rem;
  }

  header {
    display: flex;
    flex-direction: column;

    h1 {
      text-align: center;
      font-weight: bold;
      color: ${props => props.theme.text};
      font-size: 1.5rem;
      transition: color .3s;
      will-change: color;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 992px) {
      gap: 2rem;
    }

    fieldset {
      border: 0;
      background: ${props => props.theme.login.floating};
    }
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    flex-direction: column;

    @media (min-width: 992px) {
      flex-direction: row;
    }

    span, a {
      color: ${props => props.theme.text};
      font-family: ${FONTS.secondary};
      transition: color .3s;
      will-change: color;
    }

    a {
      font-weight: bold;
    }
  }
`;