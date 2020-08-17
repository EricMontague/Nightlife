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

export const reorderElements = (elements, sourceIndex, destinationIndex) => {
  const length = elements.length;
  if (
    sourceIndex < 0 ||
    sourceIndex >= length ||
    destinationIndex < 0 ||
    destinationIndex >= length
  ) {
    throw new Error("Array index out of bounds.");
  }
  const elementsCopy = elements.splice();
  const targetElement = elementsCopy[sourceIndex];
  while (destinationIndex < sourceIndex) {
    elementsCopy[sourceIndex] = elementsCopy[sourceIndex - 1];
    sourceIndex -= 1;
  }
  if (sourceIndex === destinationIndex) {
    elementsCopy[sourceIndex] = targetElement;
  }
  return elementsCopy;
};
