import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Img404 = styled.img`
  @media (max-width: 800px) {
    width: 50%;
    height: auto;
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #141414;
`;

export const Span = styled.span`
  margin-bottom: 55px;
  font-size: 1.1em;
  text-align: center;
  margin-left: 2vw;
  color: white;
`;

export const BackLink = styled(Link)`
  text-decoration: none;
  color: var(--primary);
  transition: 200ms;
  &:hover {
    color: rgb(229, 9, 20, 0.7);
  }
`;
