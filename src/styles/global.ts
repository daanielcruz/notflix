import styled, { createGlobalStyle } from 'styled-components';
import bgForm from '../assets/bg-form.jpg';

export default createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

:root {
  --primary: #e50914;
  --black: #000000;
  --blackLighter: #9e9e9e;
  --grayLight: #f5f5f5;
  --grayMedium: #e5e5e5;
  --white: #ffffff;
  --arrow: rgba(255,255,255, 0.3);
}

html,
body {
  margin: 0;
}

a {
  color: inherit;
}

#root {
  min-height: calc(100vh - var(--bodyPaddingTop));
  display: flex;
  flex-direction: column;
}
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

export const MainContainerFlix = styled.div`
  background: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 5%;
  padding-right: 5%;
  justify-content: center;
  align-items: center;
  background-image: url(${bgForm});
  background-size: cover;
  color: var(--white);
`;

export const FormContainer = styled.div`
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
  margin-bottom: 35px;
  @media (max-width: 800px) {
    font-size: 18px;
    margin-bottom: 25px;
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
