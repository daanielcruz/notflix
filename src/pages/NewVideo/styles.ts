import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const EndBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
  font-size: 1.1em;
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
