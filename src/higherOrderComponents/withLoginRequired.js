import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const withLoginRequired = WrappedComponent => {
  return props => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    useEffect(() => {
      if (!isLoggedIn) {
        props.history.push("/");
      }
    }, [isLoggedIn, props]);

    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withLoginRequired;
