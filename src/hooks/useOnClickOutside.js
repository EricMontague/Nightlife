import { useEffect } from "react";

const useOnClickOutside = (ref, clickHandler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      clickHandler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, clickHandler]);
};

export default useOnClickOutside;
