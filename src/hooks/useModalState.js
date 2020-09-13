import { useState, useEffect } from "react";
import {
  disableScrollY,
  enableScrollY,
  disableNavigation,
  enableNavigation
} from "../utils/commonHelpers";

const useModalState = initialState => {
  const [isVisible, toggleState] = useState(initialState);

  useEffect(() => {
    if (isVisible) {
      disableScrollY();
      disableNavigation();
    } else {
      enableScrollY();
      enableNavigation();
    }
  }, [isVisible, toggleState]);
  return [isVisible, toggleState];
};

export default useModalState;
