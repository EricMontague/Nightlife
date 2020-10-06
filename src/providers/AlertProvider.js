import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ALERT } from "../redux/actions/types";
import PropTypes from "prop-types";

const ALERT_DISPLAY_TIME = 5000;

const AlertProvider = props => {
  // Declare hooks
  const alertRef = useRef();
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alertReducer);
  let timeoutId;

  const showAlert = () => {
    if (alert.message) {
      alertRef.current.classList.add("show");
      timeoutId = setTimeout(close, ALERT_DISPLAY_TIME);
    }
  };

  const close = () => {
    alertRef.current.classList.remove("show");
    dispatch({
      type: CLEAR_ALERT,
      message: "",
      alertClassName: ""
    });
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  // Shows an alert if there's a message in the redux store
  showAlert();

  return (
    <div>
      <div className="alert" ref={alertRef}>
        <div className={"alert-content " + alert.alertClassName}>
          <p>{alert.message}</p>
          <button className="close-btn" onClick={close}>
            &times;
          </button>
        </div>
      </div>

      {props.children}
    </div>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AlertProvider;
