import React from 'react';
import logoImg from '../../assets/logo.svg';
import GlobalStyle, {
  Button,
  NavContainer,
  Logo,
  LogoLink,
  ButtonAdmin,
} from './styles';

const Menu = () => {
  return (
    <>
      <GlobalStyle />
      <NavContainer>
        <LogoLink to="/">
          <Logo className="Logo" src={logoImg} alt="VideoFlix" />
        </LogoLink>
        <div>
          <ButtonAdmin to="/admin">Admin</ButtonAdmin>
          <Button to="/register/video">New Video</Button>
        </div>
      </NavContainer>
    </>
  );
};

export default Menu;
