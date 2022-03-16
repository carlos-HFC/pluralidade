import styled from "styled-components";

import { FONTS } from "../../styles/variables";

export const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 1rem;

  @media (min-width: 500px) {
    padding: 2rem;
  }

  header {
    display: flex;
    flex-direction: column;

    h3 {
      text-align: center;
      font-weight: bold;
      color: ${props => props.theme.text};
      font-family: ${FONTS.primary};
      margin: 0;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 30px;

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

    span, a {
      color: ${props => props.theme.text};
      font-family: ${FONTS.secondary};
    }

    a {
      font-weight: bold;
    }
  }
`;