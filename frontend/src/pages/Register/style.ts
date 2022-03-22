import styled from "styled-components";

import { FONTS } from "../../styles/variables";

export const SignUp = styled.section`
  min-height: 100vh;
  padding: 3rem 0;
  background: ${props => props.theme.login.background};
  transition: background-color .3s;

  .signup {
    width: 100%;
    display: flex;
    padding: 2.5rem 1rem;
    margin: auto;
    flex-direction: column;
    max-width: 37.5rem;
    gap: 2rem;

    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;
      position: relative;
      width: 100%;
      color: ${props => props.theme.text};
      transition: color .3s;
      font-size: 1.5rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 992px) {
        gap: 2rem;
      }

      span {
        font-family: ${FONTS.secondary};
        font-weight: bold;
      }

      .col {
        &-half {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;

          @media (min-width: 992px) {
            flex-direction: row;
            gap: 2rem;
          }
        }

        &-threequarter {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;

          & > :first-child {
            @media (min-width: 992px) {
              width: 75%
            }
          }

          & > :last-child {
            @media (min-width: 992px) {
              width: 25%
            }
          }

          @media (min-width: 992px) {
            flex-direction: row;
            gap: 2rem;
          }
        }
      }

      .set__deficiency {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        & > div {
          display: flex;
          gap: 2rem;

          fieldset {
            width: auto;
          }
        }
      }

      fieldset {
        border: 0;
        background: ${props => props.theme.login.floating};
        width: 100%;
      }
    }
  }
`;