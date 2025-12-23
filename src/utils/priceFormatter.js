export const priceFormatter = (price) => {
  const decimalPart = String(price).split(".")[1];

  if (Number.isNaN(price)) return "00.00";
  if (!decimalPart) return `${price}.00`;
  if (decimalPart.length === 1) return `${price}0`;
  return price.toFixed(2);
};
