import React from 'react';
import Footer from '../Footer';
import Menu from '../Menu';
import { Main } from './styles';

const PageDefault = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Menu />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default PageDefault;
