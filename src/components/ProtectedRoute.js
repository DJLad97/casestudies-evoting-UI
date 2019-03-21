import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../utils/auth";

/*
 *
 * Protected route is a route object that ensures that the user is logged in before allowing them access to the requested route
 * @returns {Route}
 * @exports {ProtectedRoute}
 *
 */
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.getInstance().isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
