import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

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

  @media (hover: hover) {
    &:hover {
      img {
        transform: scale(1.05) rotate(1.5deg);
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
`;

const Footer = styled.div`
  display: flex;
  font-weight: bold;
`;

export function Card({ children, title, img, link }: CardProps) {
  return (
    <CardWrapper className="card">
      <Image>
        <img src={img} alt={title} title={title} loading="lazy" />
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