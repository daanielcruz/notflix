import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

export default createGlobalStyle`
body {
  --bodyPaddingTop: 94px;
  padding-top: var(--bodyPaddingTop);
}
@media (max-width: 800px) {
  body {
    --bodyPaddingTop: 40px;
    padding-top: var(--bodyPaddingTop);
  }
}
`;

export const NavContainer = styled.nav`
  width: 100%;
  height: 94px;
  z-index: 100;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-left: 5%;
  padding-right: 5%;

  background: var(--black);
  border-bottom: 2px solid var(--primary);

  @media (max-width: 800px) {
    height: 50px;
    justify-content: center;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  justify-content: center;
  outline: none;
`;

export const Logo = styled.img`
  max-width: 168px;
  filter: invert(11%) sepia(99%) saturate(6349%) hue-rotate(354deg)
    brightness(90%) contrast(99%);

  @media (max-width: 800px) {
    max-width: 105px;
  }
`;

export const Button = styled(Link)`
  color: var(--white);
  border: 1px solid var(--white);
  box-sizing: border-box;
  cursor: pointer;
  padding: 16px 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.3s;

  &:hover,
  &:focus {
    opacity: 0.5;
  }

  @media (max-width: 800px) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--primary);
    border-radius: 0;
    border: 0;
    text-align: center;
  }
`;
