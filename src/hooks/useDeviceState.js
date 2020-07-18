import { useState } from "react";

const useDeviceState = initialState => {
  const [isDesktop, toggleDeviceState] = useState(initialState);
  return [isDesktop, toggleDeviceState];
};

export default useDeviceState;
