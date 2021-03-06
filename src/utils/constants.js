const constants = Object.freeze({
  PLACES_API_FIELDS: [
    "place_id", // basic billing
    "formatted_address", // basic billing
    "geometry.location", // basic billing
    "name", // basic billing
    "opening_hours", // contact billing
    "website", // contact billing
    "rating", // atmosphere billing
    "price_level", // atmosphere billing
    "photo" // basic billing
  ],
  DISCOVER_MODE: {
    CREATE: "create",
    EDIT: "edit",
    VIEW: "view" // read-only
  },
  GOOGLE_MAPS_SCRIPT_URL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GCP_API_KEY}`,
  GOOGLE_LIBRARIES: { places: "places" },
  GOOGLE_IMAGE_HEIGHT: 400,
  GOOGLE_IMAGE_WIDTH: 400,
  GOOGLE_PLACE_TYPES: ["establishment"],
  DEFAULT_GOOGLE_MAPS_LAT: 40.7118,
  DEFAULT_GOOGLE_MAPS_LNG: -74.0131,
  SORT_BY_RATING_ASC: "Rating: low to high",
  SORT_BY_RATING_DESC: "Rating: high to low",
  SORT_BY_PRICE_LEVEL_ASC: "Price: low to high",
  SORT_BY_PRICE_LEVEL_DESC: "Price: high to low",
  SORT_BY_KEY: "Sort by key",
  DEFAULT_PRICE_LEVEL: 0,
  DEFAULT_RATING: Number.MIN_VALUE,
  ALERT_SUCCESS_CLASS_NAME: "success",
  ALERT_ERROR_CLASS_NAME: "danger",
  PLAN_CREATED_SUCCESS_MESSAGE: "Your plan was successfully created!",
  PLAN_UPDATED_SUCCESS_MESSAGE: "Your plan was successfully updated!",
  PLAN_DELETED_SUCCESS_MESSAGE: "Your plan was successfully deleted!",
  NO_PLACES_SELECTED_ERROR_MESSAGE: "Please choose at least one place"
});

export default constants;
