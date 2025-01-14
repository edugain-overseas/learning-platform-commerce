export const stripHtmlTags = (string) => {
  return string ? string.replace(/<[^>]*>/g, "") : "";
};
