import { ReactComponent as APlus } from "../images/icons/letterGrade/a-plus.svg";
import { ReactComponent as A } from "../images/icons/letterGrade/a.svg";
import { ReactComponent as AMinus } from "../images/icons/letterGrade/a-minus.svg";
import { ReactComponent as BPlus } from "../images/icons/letterGrade/b-plus.svg";
import { ReactComponent as B } from "../images/icons/letterGrade/b.svg";
import { ReactComponent as BMinus } from "../images/icons/letterGrade/b-minus.svg";
import { ReactComponent as CPlus } from "../images/icons/letterGrade/c-plus.svg";
import { ReactComponent as C } from "../images/icons/letterGrade/c.svg";
import { ReactComponent as CMinus } from "../images/icons/letterGrade/c-minus.svg";
import { ReactComponent as DPlus } from "../images/icons/letterGrade/d-plus.svg";
import { ReactComponent as D } from "../images/icons/letterGrade/d.svg";
import { ReactComponent as DMinus } from "../images/icons/letterGrade/d-minus.svg";
import { ReactComponent as F } from "../images/icons/letterGrade/f.svg";

export const letterGrade = (grade) => {
  if (195 <= grade) {
    return "A+";
  }
  if (190 <= grade) {
    return "A";
  }
  if (180 <= grade) {
    return "A-";
  }
  if (170 <= grade) {
    return "B+";
  }
  if (160 <= grade) {
    return "B";
  }
  if (150 <= grade) {
    return "B-";
  }
  if (140 <= grade) {
    return "C+";
  }
  if (130 <= grade) {
    return "C";
  }
  if (120 <= grade) {
    return "C-";
  }
  if (110 <= grade) {
    return "D+";
  }
  if (100 <= grade) {
    return "D";
  }
  if (90 <= grade) {
    return "D-";
  }
  if (0 < grade) {
    return "F";
  }
  return null;
};

const icons = {
  "A+": <APlus />,
  A: <A />,
  "A-": <AMinus />,

  "B+": <BPlus />,
  B: <B />,
  "B-": <BMinus />,

  "C+": <CPlus />,
  C: <C />,
  "C-": <CMinus />,

  "D+": <DPlus />,
  D: <D />,
  "D-": <DMinus />,

  F: <F />,
};

export const getIcon = (grade) => {
  return grade ? icons[letterGrade(grade)] : null;
};
