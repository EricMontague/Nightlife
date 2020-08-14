export const trimObjectFieldValues = obj => {
  const trimmedObject = {};
  for (const property in obj) {
    trimmedObject[[property]] = obj[property].trim();
  }
  return trimmedObject;
};
