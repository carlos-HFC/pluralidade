import styled from "styled-components";

import { FONTS } from "../../styles/variables";

export const SignUp = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  background: ${props => props.theme.login.background};
  
  @media (min-width: 992px) {
    padding: 50px;
  }

  h3, h6, svg {
    margin: 0;
    color: ${props => props.theme.text};
  }

  .signup {
    width: 100%;
    display: flex;
    padding: 2rem 1rem;
    margin: auto;
    flex-direction: column;
    max-width: 600px;
    gap: 1.5rem;
    
    @media (min-width: 992px) {
      padding: 2rem;
    }

    header {
      display: flex;
      flex-direction: column;

      h3 {
        text-align: center;
        font-weight: bold;
        font-family: ${FONTS.primary};
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 992px) {
        gap: 2rem;
      }

      h6 {
        font-family: ${FONTS.secondary};
      }

      #btn-cep {
        height: 100%;
      }

      fieldset {
        border: 0;
        background: ${props => props.theme.login.floating};
      }
    }
  }
`;