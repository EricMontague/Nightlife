const constants = Object.freeze({
  PLACES_API_FIELDS: [
    "place_id", // basic billing
    "formatted_address", // basic billing
    "geometry.location", // basic billing
    "business_status", // basic billing
    "icon", // basic billing
    "name", // basic billing
    "opening_hours", // contact billing
    "website", // contact billing
    "rating", // atmosphere billing
    "price_level", // atmosphere billing
    "photo" // basic billing
  ],
  DISCOVER_MODE: {
    CREATE: "create",
    UPDATE: "update",
    VIEW: "view" // read-only
  },
  PLACE_DETAILS_URL: `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.REACT_APP_GCP_API_KEY}`,
  SORT_BY_RATING_ASC: "Rating: low to high",
  SORT_BY_RATING_DESC: "Rating: high to low",
  SORT_BY_PRICE_LEVEL_ASC: "Price: low to high",
  SORT_BY_PRICE_LEVEL_DESC: "Price: high to low"
});

export default constants;
