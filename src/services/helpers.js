export const trimObjectFieldValues = obj => {
  const trimmedObject = {};
  for (const property in obj) {
    trimmedObject[[property]] = obj[property].trim();
  }
  return trimmedObject;
};

export const hasGoogleScript = (sourceAttributeValue, urlParameters) => {
  let hasScript = false;
  const scriptNodes = document.querySelectorAll(
    `script[src^="${sourceAttributeValue}"]`
  );
  scriptNodes.forEach(scriptNode => {
    urlParameters.forEach(parameter => {
      if (scriptNode.src.includes(parameter)) {
        hasScript = true;
      }
    });
  });
  return hasScript;
};

export const removeGoogleScript = (sourceAttributeValue, urlParameters) => {
  let numParameters = urlParameters.length;
  const scriptNode = document.querySelector(
    `script[src^="${sourceAttributeValue}"]`
  );
  for (let index = 0; index < numParameters; index++) {
    if (scriptNode.src.includes(urlParameters[index])) {
      numParameters -= 1;
    }
  }
  if (numParameters === 0) {
    scriptNode.remove();
  }
};

export const loadGoogleScript = (sourceAttributeValue, urlParameters) => {
  const newScriptElement = document.createElement("script");
  newScriptElement.src = sourceAttributeValue + "&" + urlParameters.join("&");
  newScriptElement.type = "text/javascript";
  document.body.appendChild(newScriptElement);
};

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

export const disablePointerEvents = () => {
  document.body.classList.add("no-pointer-events");
};

export const disableNavigation = () => {
  document.querySelector(".navbar").classList.add("no-pointer-events");
};

export const enablePointerEvents = () => {
  document.body.classList.remove("no-pointer-events");
};

export const enableNavigation = () => {
  document.querySelector(".navbar").classList.remove("no-pointer-events");
};

export const enableScrollY = () => {
  document.body.classList.remove("no-scroll-y");
};

export const disableScrollY = () => {
  document.body.classList.add("no-scroll-y");
};
