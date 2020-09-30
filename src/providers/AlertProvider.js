import React, { useState, useRef, useContext } from "react";
import PropTypes from "prop-types";

const ALERT_DISPLAY_TIME = 5000;

const AlertContext = React.createContext();

export const useAlertContext = () => {
  return useContext(AlertContext);
};

const AlertProvider = props => {
  // Declare hooks
  const alertRef = useRef();
  const [alertState, setState] = useState({
    message: "",
    alertClassName: ""
  });

  const show = () => {
    if (alertState.message) {
      alertRef.current.classList.add("show");
      setTimeout(close, ALERT_DISPLAY_TIME);
    }
  };

  const close = () => {
    alertRef.current.classList.remove("show");
    setState({ message: "", alertClassName: "" });
  };

  const setAlertState = newState => {
    setState(newState);
  };

  return (
    <AlertContext.Provider value={{ showAlert: show, setAlertState }}>
      <div className="alert" ref={alertRef}>
        <div className={"alert-content " + alertState.alertClassName}>
          <p>{alertState.message}</p>
          <button className="close-btn" onClick={close}>
            &times;
          </button>
        </div>
      </div>

      {props.children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AlertProvider;
