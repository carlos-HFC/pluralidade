import { transparentize } from 'polished';
import styled from 'styled-components';

import { FONTS } from '../../styles/variables';

export const Menu = styled.div`
  gap: 5px;
  display: flex;
`;

export const MenuList = styled.div<{ active: boolean; }>`
  display: flex;
  flex-direction: column;
  transition: transform 1s, background .3s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: calc(2rem + 50px) 1.5rem 2rem;
  z-index: 2;
  background: ${props => props.theme.header};

  ${props => props.active ? 'transform: translate(0);' : 'transform: translateY(-100%);'}

  @media (min-width: 992px) {
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

export const HeaderWrapper = styled.header`
  padding: calc(1rem + 50px) 0 1rem;
  background: ${props => props.theme.header};

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

      @media (min-width: 992px) {
        display: none;
      }
    }

    .close {
      display: flex;
      justify-content: flex-end;

      @media (min-width: 992px) {
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

      @media (min-width: 992px) {
        flex-direction: row;
      }

      .link {
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        font-weight: bold;
        font-family: ${FONTS.primary};

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
`;