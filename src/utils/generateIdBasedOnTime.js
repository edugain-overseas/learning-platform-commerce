export const generateId = () => {
  const now = new Date();
  return now.getTime().toString();
};
