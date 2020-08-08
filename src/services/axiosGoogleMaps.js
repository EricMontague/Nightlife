import axios from "axios";
import constants from "./constants";

export const axiosPlaceDetailsInstance = axios.create({
  baseURL: constants.PLACE_DETAILS_URL,
  timeout: 10000
});
