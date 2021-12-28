import { transparentize } from "polished";
import { createGlobalStyle } from "styled-components";

import { COLORS } from "../../styles/variables";

export const AccessibilityStyle = createGlobalStyle`
  .accessibility {
    width: 100%;
    z-index: 9;
    position: fixed;
    display: flex;
    height: 50px;
    background: #fff;
    box-shadow: 0 2px 5px ${transparentize(.8, '#000')};

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        color: ${COLORS.black};
        text-decoration: underline;
        font-size: 1.05rem;
      }

      .switch {
        display: flex;
        align-items: center;

        &__slider {
          border-radius: 30px;
          background: #fff;
          border: 1px solid ${transparentize(.6, COLORS.gray)};
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          width: 50px;
          height: 15px;
          position: relative;

          &::before {
            border-radius: 50%;
            background: #f7f7f7;
            border: 1px solid ${transparentize(.6, COLORS.gray)};
            bottom: -5px;
            content: "";
            height: 22px;
            left: -5px;
            position: absolute;
            transition: 0.2s;
            width: 22px;
          }
        }

        &__check {
          height: 0;
          opacity: 0;
          width: 0;

          &:checked + .switch__slider {
            background: #000;
            border: 1px solid #000;

            &::before {
              transform: translateX(35px);
            }
          }

          &:focus + .switch__slider {
            box-shadow: 0 0 1px #000;
          }
        }
      }
    }
  }
`;