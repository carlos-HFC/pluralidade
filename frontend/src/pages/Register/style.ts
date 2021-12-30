import styled from "styled-components";

export const SignUp = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background: ${props => props.theme.login.background};

  h3, h6, a, svg {
    color: ${props => props.theme.text}
  }

  .signup {
    width: 100%;
    display: flex;
    padding: 2rem;
    margin: auto;
    gap: 30px;
    flex-direction: column;
    border-radius: 1rem;
    max-width: 600px;

    header {
      display: flex;
      flex-direction: column;

      h3 {
        text-align: center;
        font-weight: bold;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 30px;

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