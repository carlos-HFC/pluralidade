import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS, FONTS } from "../../styles/variables";

interface CardProps {
  img: string;
  title: string;
  link: string;
  children: ReactNode;
  date: Date | string;
}

const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: .5rem;
  border-radius: 0.25rem;
  box-shadow: 0 .125rem .5rem rgba(0,0,0, .2);

  @media (hover: hover) {
    &:hover {
      img {
        transform: scale(1.05);
        opacity: 1;
      }
    }
  }

  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

const Image = styled.div`
  height: 12.5rem;
  overflow: hidden;
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
  position: relative;

  @media (min-width: 992px) {
    height: 15rem;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .5s, opacity .3s;

    @media (min-width: 992px) and (hover: hover) {
      opacity: 0.8;
    }
  }

  span {
    font-size: .8rem;
    margin: 0;
    color: ${COLORS.white};
    font-family: ${FONTS.primary};
    position: absolute;
    left: 0;
    bottom: 0;
    background: ${props => props.theme.header};
    padding: .5rem;
    max-width: 3.5rem;
    text-align: center;
    font-weight: bold;
  }
`;

const Body = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  border: 1px solid rgba(0,0,0,.1);
  border-top: 0;
  border-bottom-left-radius: .25rem;
  border-bottom-right-radius: .25rem;
  
  @media (min-width: 992px) {
    padding: 1rem 1.5rem;
    gap: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin: 0;
    flex: 1;
    color: ${props => props.theme.text};
    font-family: ${FONTS.primary};
    font-weight: bold;
  }
  
  p {
    font-size: 1rem;
    margin: 0;
    color: ${props => props.theme.text};
    font-family: ${FONTS.secondary};
  }
`;

export function CardEvent({ children, img, title, link, date }: CardProps) {
  return (
    <CardWrapper>
      <Link to={link}>
        <Image>
          <img src={img} alt={title} title={title} loading="lazy" draggable="false" />
          <span>{date}</span>
        </Image>
        <Body>
          <h3 title={title}>{title}</h3>
          <p>{children}</p>
        </Body>
      </Link>
    </CardWrapper>
  );
}