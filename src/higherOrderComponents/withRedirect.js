import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// Redirects the user if they're already logged in
const withRedirect = WrappedComponent => {
  return props => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
      console.log("useEffect called!");
      if (isLoggedIn) {
        props.history.push(
          `/users/${currentUser.displayName.replace(" ", "")}`
        );
      }
    }, [isLoggedIn, currentUser]);

    return <WrappedComponent {...props} />;
  };
};

export default withRedirect;
