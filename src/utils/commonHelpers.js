export const trimObjectFieldValues = obj => {
  const trimmedObject = {};
  for (const property in obj) {
    trimmedObject[[property]] = obj[property].trim();
  }
  return trimmedObject;
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
