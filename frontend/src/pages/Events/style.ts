import styled from "styled-components";

import { COLORS } from "../../styles/variables";

export const EventsContainer = styled.section.attrs({ className: "container" })`
  padding: 150px 0;
  display: flex;
  flex-direction: column;
`;

export const EventsGrid = styled.div`
    display: grid;
  grid-template-rows: auto;
  gap: 2rem;

  @media (min-width: 768px) and (max-width: 1199.9px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }

  .card {
    background: ${props => props.theme.card.backgroundSecondary};
    transition: .3s;

    h3, a, p {
      color: ${props => props.theme.text};
    }

    @media (hover: hover) {
      &:hover {
        background: ${props => props.theme.card.bgHoverSecondary};

        h3, a, p {
          color: ${COLORS.white};
        }
      }
    }
  }
`;