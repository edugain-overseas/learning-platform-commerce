import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowDownIcon } from "../../../images/icons/arrow-left.svg";
import { lessons } from "../../../assets/courses";
import styles from "./LessonNavigateBtn.module.scss";

const LessonNavigateBtn = ({
  forward = false,
  width = "114rem",
  height = "28rem",
  label = forward ? "Next" : "Return",
  currentNumber = 1,
}) => {
  const navigate = useNavigate();

  const coursesLessons = [...lessons].sort(
    (itemA, itemB) => itemA.number - itemB.number
  );

  const targetLesson = coursesLessons.find(({ number: num }) => {
    if (forward) {
      return num === currentNumber + 1;
    }
    return num === currentNumber - 1;
  });

  const handleNavigate = () => {
    const targetLessonId = targetLesson.lessonId;
    navigate(`/task/${targetLessonId}`);
  };

  return (
    <button
      className={`${styles.btn} ${forward ? styles.next : styles.prev}`}
      onClick={handleNavigate}
      style={{
        width,
        height,
        flexDirection: forward ? "row-reverse" : "row",
        opacity: targetLesson ? "1" : "0",
        pointerEvents: targetLesson ? "auto" : "none",
      }}
    >
      <ArrowDownIcon />
      <span>{label}</span>
    </button>
  );
};

export default LessonNavigateBtn;
