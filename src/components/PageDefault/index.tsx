import React from 'react';
import Footer from '../Footer';
import Menu from '../Menu';

const PageDefault = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Menu />
      {children}
      <Footer />
    </>
  );
};

export default PageDefault;
