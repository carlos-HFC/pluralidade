import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

import { COLORS } from "../../styles/variables";

interface CardProps {
  img: string;
  title: string;
  link?: string;
  children: ReactNode;
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 3rem;
  gap: 1.5rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(0,0,0,.1) !important;
  background: ${props => props.theme.card.backgroundPrimary};
  transition: background-color 0.2s, color 0.2s;

  @media (hover: hover) {
    &:hover {
      &:nth-child(odd) {
        background: ${props => props.theme.card.bgHoverSecondary} !important;
      }
      &:nth-child(even) {
        background: ${props => props.theme.card.bgHoverPrimary} !important;
      }

      h3, p, a {
        color: ${COLORS.white};
      }

      img {
        transform: scale(1.1) rotate(2deg);
      }
    }
  }
`;

const Image = styled.div`
  height: 150px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .5s;
  }
`;

const Body = styled.div`
  flex: 1;
  text-align: justify;

  h3 {
    padding-bottom: 1rem;
  }

  p {
    line-height: 1.8;
  }

  /* h3, p, a {
    color: ${props => props.theme.text};
  } */
`;

const Footer = styled.div`
  display: flex;
  font-weight: bold;
`;

export function Card({ children, title, img, link }: CardProps) {
  return (
    <CardWrapper className="card">
      <Image>
        <img src={img} alt={title} loading="lazy" />
      </Image>
      <Body>
        <h3 title={title}>{title}</h3>
        <p>{children}</p>
      </Body>
      {link &&
        <Footer>
          <Link to={link} title="Ver mais">Ver mais</Link>
        </Footer>
      }
    </CardWrapper>
  );
}