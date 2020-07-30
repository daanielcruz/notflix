import React from "react";
import logoImg from "../../assets/logo.svg";
import GlobalStyle, { Button, NavContainer, Logo, LogoLink } from "./styles";

const Menu = () => {
  return (
    <>
      <GlobalStyle />
      <NavContainer>
        <LogoLink to="/">
          <Logo className="Logo" src={logoImg} alt="VideoFlix" />
        </LogoLink>

        <Button to="/register/video">New Video</Button>
      </NavContainer>
    </>
  );
};

export default Menu;
