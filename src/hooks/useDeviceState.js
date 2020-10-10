import { useState, useEffect } from "react";

const useDeviceState = () => {
  const [device, setDeviceState] = useState(() => {
    return {
      isMobile: window.innerWidth <= 500,
      isTablet: window.innerWidth > 500 && window.innerWidth <= 1024,
      isDesktop: window.innerWidth > 1024
    };
  });

  useEffect(() => {
    const resizeListener = event => {
      const newState = {
        isMobile: window.innerWidth <= 500,
        isTablet: window.innerWidth > 500 && window.innerWidth <= 1024,
        isDesktop: window.innerWidth >= 1024
      };
      setDeviceState(newState);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [device, setDeviceState]);
  return device;
};

export default useDeviceState;
