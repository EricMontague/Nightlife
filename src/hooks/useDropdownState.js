import { useState } from "react";

const useDropdownState = initialState => {
  const [isOpen, toggleState] = useState(initialState);
  return [isOpen, toggleState];
};

export default useDropdownState;
