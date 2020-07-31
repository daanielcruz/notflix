import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TitleCategories = styled.h3`
  margin: 3vh 0 0 0;
`;

export const Ul = styled.ul`
  columns: 1;
  list-style: none;
  padding: 0;
  > li {
    position: relative;
    padding-bottom: 10px;
  }
  > li:before {
    content: '';
    position: absolute;
    border-right: 2px solid var(--primary);
    border-bottom: 2px solid var(--primary);
    width: 5px;
    height: 5px;
    top: calc(50% - 4px);
    left: -15px;
    transform: translateY(-50%) rotate(-45deg);
  }
`;

export const Categories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EndBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
