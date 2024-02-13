export const remToPx = (rem) => {
  const fs = document.documentElement.style.fontSize;
  const cof = Number.parseFloat(fs);
  return rem * cof;
};
