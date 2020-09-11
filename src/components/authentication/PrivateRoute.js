import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: WrappedComponent,
  ...routeComponentProps
}) => {
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const currentUser = useSelector(state => state.authReducer.currentUser);

  return (
    <Route
      {...routeComponentProps}
      render={props =>
        isLoggedIn ? (
          <WrappedComponent
            {...props}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
