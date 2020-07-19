import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

const DeviceContext = React.createContext();

export const useDeviceContext = () => {
  return useContext(DeviceContext);
};

const DeviceProvider = props => {
  const [isDesktop, toggleState] = useState(() => {
    return window.innerWidth > 768 ? true : false;
  });

  window.addEventListener("resize", event => {
    if (window.innerWidth > 768) {
      toggleState(true);
    } else {
      toggleState(false);
    }
  });

  return (
    <DeviceContext.Provider value={isDesktop}>
      {props.children}
    </DeviceContext.Provider>
  );
};

DeviceProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default DeviceProvider;
