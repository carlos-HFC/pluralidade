import { lighten } from "polished";
import { createGlobalStyle } from "styled-components";

import { COLORS } from '../../styles/variables';

export const AboutUsStyle = createGlobalStyle`
  section {
    padding: 150px 2rem !important;
    gap: 50px;
    display: flex;
    flex-direction: column;

    @media (min-width: 992px) {
      padding: 150px 200px !important;
    }

    div {
      h3 {
        margin-bottom: 1rem;
        position: relative;
        padding-left: 25px;
        color: ${props => props.theme.text};

        &::before {
          content: "";
          display: flex;
          width: 10px;
          height: 10px;
          background: ${lighten(.3, COLORS.gray)};
          left: 0;
          position: absolute;
          justify-content: center;
          align-items: center;
          margin-right: 50px;
          border-radius: 50%;
          top: 40%;
        }
      }

      iframe {
        width: 100%;
        height: 215px;
        border: 0;

        @media (min-width: 768px) {
          height: 450px;
        }
      }

      p {
        text-align: justify;
        color: ${props => props.theme.text};
      }

      figure {
        min-width: 50px;
        max-width: 350px;
        width: 50%;
        padding: 10px;
        margin: 0;
        
        @media (min-width: 768px) {
          padding: 15px;
          width: 100%;
        }

        &.left {
          float: left;
        }

        &.right {
          float: right;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;