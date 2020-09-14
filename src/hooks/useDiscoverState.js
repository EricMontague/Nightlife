import React, { useState, useEffect } from "react";

const useDiscoverState = initialState => {
  const [discoverState, setDiscoverState] = useState(initialState);
  return discoverState, setDiscoverState;
};

export default useDiscoverState;
