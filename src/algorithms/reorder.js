const shiftPlaceForwards = (places, sourceIndex, destinationIndex) => {
  const placesCopy = places.slice();
  const target = placesCopy[sourceIndex];
  while (sourceIndex < destinationIndex) {
    placesCopy[sourceIndex] = placesCopy[sourceIndex + 1];
    placesCopy[sourceIndex].sortKey -= 1;
    sourceIndex += 1;
  }
  if (sourceIndex === destinationIndex) {
    placesCopy[sourceIndex] = target;
    target.sortKey = sourceIndex;
  }
  return placesCopy;
};

const shiftPlaceBackwards = (places, sourceIndex, destinationIndex) => {
  const placesCopy = places.slice();
  const target = placesCopy[sourceIndex];
  while (sourceIndex > destinationIndex) {
    placesCopy[sourceIndex] = placesCopy[sourceIndex - 1];
    placesCopy[sourceIndex].sortKey += 1;
    sourceIndex -= 1;
  }
  if (sourceIndex === destinationIndex) {
    placesCopy[sourceIndex] = target;
    target.sortKey = sourceIndex;
  }
  return placesCopy;
};

export const reorderPlaces = (places, sourceIndex, destinationIndex) => {
  const length = places.length;
  if (
    sourceIndex < 0 ||
    sourceIndex >= length ||
    destinationIndex < 0 ||
    destinationIndex >= length ||
    sourceIndex === destinationIndex
  ) {
    return places;
  }
  if (sourceIndex < destinationIndex) {
    return shiftPlaceForwards(places, sourceIndex, destinationIndex);
  }
  return shiftPlaceBackwards(places, sourceIndex, destinationIndex);
};
