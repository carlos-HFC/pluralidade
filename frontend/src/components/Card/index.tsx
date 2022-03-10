import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

interface CardProps {
  img: string;
  title: string;
  link: string;
  children: ReactNode;
}

const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: .5rem;
  border-radius: 0.25rem;
  /* border: 1px solid rgba(0,0,0,.1) !important; */
  border: solid;
  /* background: ${props => props.theme.card.backgroundPrimary}; */

  @media (hover: hover) {
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }

  a {
    text-decoration: none;
  }
`;

const Image = styled.div`
  height: 12.5rem;
  overflow: hidden;

  @media (min-width: 992px) {
    height: 15rem;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .5s;
  }
`;

const Body = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;

  @media (min-width: 992px) {
    padding: 1rem 1.5rem;
    gap: .5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  p {
    font-size: 1rem;
    margin: 0;
    flex: 1;
  }

  a {
    font-weight: bold;
    font-size: 1rem;
  }
`;

export function Card({ children, title, img, link }: CardProps) {
  return (
    <CardWrapper>
      <Link to={link}>
        <Image>
          <img src={img} alt={title} title={title} loading="lazy" draggable="false" />
        </Image>
        <Body>
          <h3 title={title}>{title}</h3>
          <p>{children}</p>
        </Body>
      </Link>
    </CardWrapper>
  );
}