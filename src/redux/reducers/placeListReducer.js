import actionTypes from "../actions/types";

const deletePlace = (places, placeId) => {
  const newPlaces = [];
  let found = false;
  const places = this.state.places.slice();
  for (let index = 0; index < places.length; index++) {
    if (places[index].placeId === placeId) {
      found = true;
      continue;
    }
    if (found) {
      places[index].sortKey -= 1;
    }
    newPlaces.push(places[index]);
  }
  return newPlaces;
};

const addPlace = (places, newPlace) => {
  const existingPlace = places.find(place => {
    return place.placeId === newPlace.placeId;
  });

  if (!existingPlace) {
    return [...places, newPlace];
  }
  return places;
};

const placeListReducer = (state, action) => {
  switch (action.type) {
    case action.type === actionTypes.ADD_PLACE:
      return {
        places: addPlace(state.places, action.newPlace),
        sortOrder: state.sortOrder
      };
    case action.type === actionTypes.DELETE_PLACE:
      return {
        places: deletePlace(state.places, action.placeId),
        sortOrder: state.sortOrder
      };
    case action.type === actionTypes.SET_SORT_ORDER:
      return {
        places: state.places,
        sortOrder: action.sortOrder
      };
    default:
      return state;
  }
};

export default placeListReducer;
