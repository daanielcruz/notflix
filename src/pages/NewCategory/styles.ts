import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.75);
  padding: 5%;
  border-radius: 4px;
  width: 450px;
  @media (max-width: 800px) {
    width: 85%;
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
  width: 5em;
  height: 5em;
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
