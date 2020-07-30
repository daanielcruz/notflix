import React from "react";
import PageDefault from "../../components/PageDefault";
import img404 from "../../assets/404.svg";
import { Img404, BackLink, Container, Span } from "./styles";

const Page404 = () => {
  return (
    <PageDefault>
      <Container>
        <Span>
          {" "}
          Page doesn't exist or some other error occured. Go to our{" "}
          <BackLink to="/">home page</BackLink>.
        </Span>
        <Img404 src={img404} alt="404" />
      </Container>
    </PageDefault>
  );
};

export default Page404;
