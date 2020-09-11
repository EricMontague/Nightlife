import { useState } from "react";

const useModalState = initialState => {
  const [isVisible, toggleState] = useState(initialState);
  return [isVisible, toggleState];
};

export default useModalState;
