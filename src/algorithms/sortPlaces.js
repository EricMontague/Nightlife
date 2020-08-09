import constants from "../services/constants";

// Ratings will be floats from 0.0 to 5.0, inclusive
const sortByRating = (places, reverse = false) => {
  if (reverse) {
    return places.sort((placeA, placeB) => {
      return parseInt(placeA.rating - placeB.rating) * -1;
    });
  }
  return places.sort((placeA, placeB) => {
    return parseInt(placeA.rating - placeB.rating);
  });
};

// Price levels will be integers from 0 to 4, inclusive
const sortByPriceLevel = (places, reverse = false) => {
  if (reverse) {
    return places.sort((placeA, placeB) => {
      return parseInt((placeA.priceLevel = placeB.priveLevel)) * -1;
    });
  }
  return places.sort((placeA, placeB) => {
    return parseInt((placeA.priceLevel = placeB.priveLevel));
  });
};

const sortRunner = (places, sortOrder) => {
  let newPlaces;

  switch (sortOrder) {
    case constants.SORT_BY_RATING_ASC:
      newPlaces = sortByRating(places);
      break;
    case constants.SORT_BY_RATING_DESC:
      newPlaces = sortByRating(places, true);
      break;
    case constants.SORT_BY_PRICE_LEVEL_ASC:
      newPlaces = sortByPriceLevel(places);
      break;
    case constants.SORT_BY_PRICE_LEVEL_DESC:
      newPlaces = sortByPriceLevel(places, true);
      break;
    default:
      newPlaces = places;
  }
  return newPlaces;
};

export default sortRunner;
