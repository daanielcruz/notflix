import React from "react";
import PageDefault from "../../components/PageDefault";
import { Link } from "react-router-dom";

const NewVideo = () => {
  return (
    <PageDefault>
      <h1> I'm Just a Test</h1>

      <Link to="/register/category">Register Category</Link>
    </PageDefault>
  );
};

export default NewVideo;
