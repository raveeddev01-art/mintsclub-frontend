import React from 'react';
import { Route,  Redirect } from "react-router-dom";
import { ENV } from "./config/config";
export const PrivateRoute = ({ component: Component, access,path, ...rest }) => (
  

    <Route
        {...rest}
        render={props =>
            ENV.getUserKeys("_id")._id ||path==='/login'||path==='/signup' ?
                (<Component {...props} />)
                :
                <Redirect
                to={{
                  pathname: '/login',
               
                }}
              />
        } />
);