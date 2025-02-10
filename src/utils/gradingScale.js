export const letterGrade = (grade) => {
  if (180 <= grade) {
    return "A";
  }
  if (160 <= grade) {
    return "B";
  }
  if (140 <= grade) {
    return "C";
  }
  if (120 <= grade) {
    return "D";
  }
  if (100 <= grade) {
    return "E";
  }
  if (100 > grade) {
    return "F";
  }
  return null;
};
