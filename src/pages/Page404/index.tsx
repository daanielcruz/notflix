import React from 'react';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import img404 from '../../assets/404.svg';
import { Img404, BackLink, Container, Span } from './styles';

const Page404 = () => {
  return (
    <>
      <Menu />
      <Container>
        <Span>
          {' '}
          Page doesn't exist or some other error occured. Go to our{' '}
          <BackLink to="/">home page</BackLink>.
        </Span>
        <Img404 src={img404} alt="404" />
      </Container>
      <Footer />
    </>
  );
};

export default Page404;
