import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";
import { ReactComponent as ArrowDownIcon } from "../../../images/icons/arrow-left.svg";
import { useNotificationMessage } from "../../../hooks/useNotificationMessage";
import styles from "./LessonNavigateBtn.module.scss";

const LessonNavigateBtn = ({
  forward = false,
  width = "114rem",
  height = "28rem",
  label = forward ? "Next" : "Return",
  currentNumber = 1,
  courseId = 1,
}) => {
  const navigate = useNavigate();
  const courses = useSelector(getAllCourses);
  const course = courses?.find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons || [];

  const [messageApi, contextHolder] = useNotificationMessage();

  const courseSortedLessons = [...courseLessons]?.sort(
    (a, b) => a.number - b.number
  );

  const targetLesson = courseSortedLessons?.find(({ number: num }) => {
    if (forward) {
      return num === currentNumber + 1;
    }
    return num === currentNumber - 1;
  });

  const handleNavigate = () => {
    if (targetLesson.status === "blocked") {
      messageApi.info({
        content: "You can not access this lesson becouse it is blocked",
        duration: 3,
      });
      return;
    }
    const targetLessonId = targetLesson.id;
    navigate(`/task/${targetLessonId}`);
  };

  return (
    <>
      {contextHolder}
      <button
        className={`${styles.btn} ${forward ? styles.next : styles.prev}`}
        onClick={handleNavigate}
        style={{
          width,
          height,
          flexDirection: forward ? "row-reverse" : "row",
          opacity: targetLesson ? "1" : "0.5",
          pointerEvents: targetLesson ? "auto" : "none",
        }}
        disabled={!targetLesson}
      >
        <ArrowDownIcon />
        <span>{label}</span>
      </button>
    </>
  );
};

// export default LessonNavigateBtn;
export default memo(
  LessonNavigateBtn,
  (prevProps, nextProps) =>
    prevProps.currentNumber === nextProps.currentNumber ||
    prevProps.courseId === nextProps.courseId
);
