import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import NewVideo from "../pages/NewVideo";
import NewCategory from "../pages/NewCategory";
import Page404 from "../pages/Page404";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register/video" component={NewVideo} />
        <Route exact path="/register/category" component={NewCategory} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
