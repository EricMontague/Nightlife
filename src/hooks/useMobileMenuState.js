import { useState, useEffect } from "react";
import { disableScrollY, enableScrollY } from "../utils/commonHelpers";

const useDropdownState = initialState => {
  const [isOpen, toggleState] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      disableScrollY();
    } else {
      enableScrollY();
    }
  }, [isOpen, toggleState]);
  return [isOpen, toggleState];
};

export default useDropdownState;
