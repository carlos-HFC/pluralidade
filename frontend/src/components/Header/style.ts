import { transparentize } from 'polished';
import styled, { createGlobalStyle } from 'styled-components';

export const Menu = styled.div`
  gap: 5px;
  display: flex;
`;

export const MenuList = styled.div<{ active: boolean; }>`
  display: flex;
  flex-direction: column;
  transition: transform 1s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: calc(3rem + 50px) 3rem 3rem;
  z-index: 2;
  background: ${props => props.theme.header};

  ${props => props.active ? 'transform: translate(0);' : 'transform: translateY(-100%);'}

  @media (min-width: 768px) {
    flex-direction: row;
    transform: translate(0);
    position: relative;
    background: transparent;
    padding: 0;
  }
`;

export const Hamb = styled.span`
  width: 30px;
  height: 3px;
  background: #fff;
  box-shadow: 0 2px 5px ${transparentize(.6, '#000')};
`;

export const HeaderStyle = createGlobalStyle`
  .header {
    padding: calc(1rem + 50px) 0 1rem;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .brand {
        width: 60px;
        height: 60px;
        display: flex;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .hamb {
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;

        @media (min-width: 768px) {
          display: none;
        }
      }

      .close {
        display: flex;
        justify-content: flex-end;

        @media (min-width: 768px) {
          display: none;
        }
      }

      .list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        @media (min-width: 768px) {
          flex-direction: row;
        }

        .link {
          color: #fff;
          text-decoration: none;
          cursor: pointer;
          font-weight: bold;

          &::after {
            content: "";
            width: 0;
            background: #fff;
            height: 2px;
            display: block;
            transition: width 0.25s;
          }

          @media (hover: hover) {
            &:hover {
              &::after {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }

  .login {
    padding: 40px;
    border-radius: 1rem !important;
    width: 100% !important;
  }
`;