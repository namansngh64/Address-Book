import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import React from "react";
import Signin from "./user/Signin";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact element={<Signin />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
