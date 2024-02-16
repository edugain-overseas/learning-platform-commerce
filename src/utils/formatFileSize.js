export const formatFileSize = (size) => {
  if (+size / 1000000 >= 1) {
    return `${(size / 1000000).toFixed(2)}mb`;
  }
  if (+size / 1000 >= 1) {
    return `${(size / 1000).toFixed(2)}kb`;
  }
  return `${size}b`
};
