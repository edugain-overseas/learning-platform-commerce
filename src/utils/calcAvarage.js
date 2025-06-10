export const calcAvarage = (values = []) =>
  Math.round(
    values.reduce((sum, value) => {
      return (sum += value);
    }, 0) / values.length
  ) || 0;
