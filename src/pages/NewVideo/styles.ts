import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const EndBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
  font-size: 1.1em;
  color: white;
  flex-direction: column;
  @media (max-width: 800px) {
    padding: 0;
  }
`;

export const BackLink = styled(Link)`
  text-decoration: none;
  color: var(--primary);
  transition: 200ms;
  &:hover {
    color: rgb(229, 9, 20, 0.7);
  }
`;

export const Hr = styled.hr`
  display: block !important;
  background-color: var(--arrow);
  width: 200px;
  height: 1px;
  border: none;
  margin-top: 10px;
`;
