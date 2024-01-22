import { ReactComponent as APlus } from "../images/icons/GradeAPlus.svg";

export const letterGrade = (grade) => {
  if (190 <= grade) {
    return <APlus />;
  }
  if (182 <= grade) {
    return "B";
  }
  if (175 <= grade) {
    return "C";
  }
  if (167 <= grade) {
    return "D";
  }
  if (160 <= grade) {
    return "E";
  }
  if (160 > grade) {
    return "F";
  }
  return null;
};
