import React from "react";
import { useSelector } from "react-redux";
import {Route} from "react-router-dom";


const PrivateRoute = ({component: WrappedComponent, ...routeComponentProps}) => {
    return () => {
      const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
      <Route
          {...routeComponentProps}
          render={(props) => (
            isLoggedIn ? <WrappedComponent {...props} /> : <Redirect to="/" />
          )}
        />      
    }
};

export default PrivateRoute;
