import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import React from "react";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Verify from "./user/Verify";
import Edit from "./user/Edit";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/verify" exact element={<Verify />} />
        <Route
          path="/"
          exact
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          exact
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit"
          exact
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
