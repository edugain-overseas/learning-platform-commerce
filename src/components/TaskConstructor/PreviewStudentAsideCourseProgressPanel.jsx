import React from "react";
import { ReactComponent as ExamIcon } from "../../images/icons/exam.svg";
import ProgressBar from "../shared/ProgressBar/ProgressBar";
import ProgressList from "../shared/ProgressList/ProgressList";
import styles from "./TaskConstructor.module.scss";

const PreviewStudentAsideCourseProgressPanel = ({
  lessons,
  currentLessonId,
}) => {
  const lessonList = [...lessons].sort(
    (itemA, itemB) => itemA.number - itemB.number
  );

  const currentLessonIndex = lessonList.findIndex(
    (lesson) => lesson.id === currentLessonId
  );

  const progressItems = lessonList.map(({ id, title, number }, index) => ({
    id,
    label: title,
    number,
    status:
      id === currentLessonId
        ? "active"
        : index < currentLessonIndex
        ? "completed"
        : "blocked",
    link: `/task/${id}`,
  }));

  const progressValue = ((currentLessonIndex + 1) / lessons.length) * 100;

  return (
    <div className={styles.asideCourseProgressCotainer}>
      <div className={styles.progressContainer}>
        <span>Progress:</span>
        <ProgressBar value={progressValue} width={172} height={24} />
      </div>
      <div className={styles.progressListContainer}>
        <ProgressList items={progressItems} />
      </div>
      <button className={styles.examLink} disabled={true}>
        <span>Go to exam</span>
        <ExamIcon />
      </button>
    </div>
  );
};

export default React.memo(
  PreviewStudentAsideCourseProgressPanel,
  (prevProps, nextProps) =>
    prevProps.lessons.length === nextProps.lessons.length &&
    prevProps.currentLessonId === nextProps.currentLessonId
);
