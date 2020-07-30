import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.75);
  padding: 45px;
  border-radius: 4px;
  min-width: 400px;
  width: 22vw;
  max-width: 600px;
  position: relative;
  @media (max-width: 800px) {
    min-width: 0;
    width: 90%;
  }
`;

export const Title = styled.h2`
  margin-bottom: 5vh;
  @media (max-width: 800px) {
    font-size: 18px;
    margin-bottom: 3vh;
  }
`;

export const Form = styled.form`
  text-align: center;
`;

export const Button = styled.button`
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  background: var(--primary);
  color: var(--white);
  padding: 16px;
  border: none;
  cursor: pointer;
  outline: none;
  transition: opacity 0.3s;
`;

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

export const Loading = styled.div`
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-top: 8px solid var(--primary);
  border-radius: 50%;
  width: 4em;
  height: 4em;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const GoBack = styled(Link)`
  position: absolute;
  outline: none;
  text-decoration: none;
  color: red;
  font-size: 0.9em;
  font-weight: 700;
  bottom: 15px;
  right: 20px;
`;
