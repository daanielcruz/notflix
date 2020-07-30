import React from "react";
import { FooterBase } from "./styles";

const Footer = () => {
  return (
    <FooterBase>
      <p>
        Made with ♥ by{" "}
        <a
          href="https://daanielcruz.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Daniel Cruz
        </a>
      </p>
    </FooterBase>
  );
};

export default Footer;
