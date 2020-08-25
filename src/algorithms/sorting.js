import constants from "../services/constants";
import { convertToDatetime } from "../services/dateTimeHelpers";

// Ratings will be floats from 0.0 to 5.0, inclusive
const sortByRating = (places, reverse) => {
  if (reverse) {
    return places.sort((placeA, placeB) => {
      return (placeA.rating - placeB.rating) * -1;
    });
  }
  return places.sort((placeA, placeB) => {
    return placeA.rating - placeB.rating;
  });
};

// Price levels will be integers from 0 to 4, inclusive
const sortByPriceLevel = (places, reverse) => {
  if (reverse) {
    return places.sort((placeA, placeB) => {
      return (placeA.priceLevel - placeB.priceLevel) * -1;
    });
  }
  return places.sort((placeA, placeB) => {
    return placeA.priceLevel - placeB.priceLevel;
  });
};

// Used to sort plans
export const sortByDatetime = (plans, reverse) => {
  if (reverse) {
    return plans.sort((planA, planB) => {
      return (
        (convertToDatetime(planA.date, planA.time) -
          convertToDatetime(planB.date, planB.time)) *
        -1
      );
    });
  }
  return plans.sort((planA, planB) => {
    return (
      convertToDatetime(planA.date, planA.time) -
      convertToDatetime(planB.date, planB.time)
    );
  });
};

const sortByKey = places => {
  return places.sort((placeA, placeB) => {
    return placeA.sortKey - placeB.sortKey;
  });
};

const sortRunner = (places, sortOrder) => {
  let newPlaces;
  let reverse = false;
  switch (sortOrder) {
    case constants.SORT_BY_RATING_ASC:
      newPlaces = sortByRating(places, reverse);
      break;
    case constants.SORT_BY_RATING_DESC:
      reverse = true;
      newPlaces = sortByRating(places, reverse);
      break;
    case constants.SORT_BY_PRICE_LEVEL_ASC:
      newPlaces = sortByPriceLevel(places, reverse);
      break;
    case constants.SORT_BY_PRICE_LEVEL_DESC:
      reverse = true;
      newPlaces = sortByPriceLevel(places, reverse);
      break;
    default:
      newPlaces = sortByKey(places);
  }
  return newPlaces;
};

export default sortRunner;
