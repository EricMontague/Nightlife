import {
  SHOW_SUCCESS_ALERT,
  SHOW_ERROR_ALERT,
  CLEAR_ALERT
} from "../actions/types";
import constants from "../../utils/constants";

const initialState = { message: "", alertClassName: "" };
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SUCCESS_ALERT:
      return {
        message: action.payload,
        alertClassName: constants.ALERT_SUCCESS_CLASS_NAME
      };

    case SHOW_ERROR_ALERT:
      return {
        message: action.payload,
        alertClassName: constants.ALERT_ERROR_CLASS_NAME
      };

    case CLEAR_ALERT:
      return {
        message: "",
        alertClassName: ""
      };
    default:
      return state;
  }
};

export default alertReducer;
