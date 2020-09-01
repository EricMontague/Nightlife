import React, { useState, useEffect } from "react";

const useDeviceState = () => {
  const [isDesktop, toggleState] = useState(() => {
    return window.innerWidth > 768 ? true : false;
  });

  useEffect(() => {
    const resizeListener = event => {
      if (window.innerWidth > 768) {
        toggleState(true);
      } else {
        toggleState(false);
      }
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [isDesktop, toggleState]);
  return isDesktop;
};

export default useDeviceState;
