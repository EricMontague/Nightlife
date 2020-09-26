// Helper methods for dealing with the google maps apis

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

const minMaxLatitudes = places => {
  const initialLatitude = places[0].location.lat();
  let minLatitude = initialLatitude;
  let maxLatitude = initialLatitude;
  places.forEach(place => {
    const latitude = place.location.lat();
    if (latitude > maxLatitude) {
      maxLatitude = latitude;
    }
    if (latitude < minLatitude) {
      minLatitude = latitude;
    }
  });
  return {
    minLatitude,
    maxLatitude
  };
};

const minMaxLongitudes = places => {
  const initialLongitude = places[0].location.lng();
  let minLongitude = initialLongitude;
  let maxLongitude = initialLongitude;
  places.forEach(place => {
    const longitude = place.location.lng();
    if (longitude > maxLongitude) {
      maxLongitude = longitude;
    }
    if (longitude < minLongitude) {
      minLongitude = longitude;
    }
  });
  return {
    minLongitude,
    maxLongitude
  };
};

export const calculateCenter = places => {
  const { minLatitude, maxLatitude } = minMaxLatitudes(places);
  const { minLongitude, maxLongitude } = minMaxLongitudes(places);
  return {
    lat: (maxLatitude + minLatitude) / 2.0,
    lng: (maxLongitude + minLongitude) / 2.0
  };
};
