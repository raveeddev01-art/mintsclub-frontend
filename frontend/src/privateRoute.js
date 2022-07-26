import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ENV } from "./config/config";

export const PrivateRoute = ({
  component: Component,
  access,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);
