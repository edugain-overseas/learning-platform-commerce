import React from "react";
import ProgressBar from "../shared/ProgressBar/ProgressBar";
import ProgressList from "../shared/ProgressList/ProgressList";
import { ReactComponent as ExamIcon } from "../../images/icons/exam.svg";
import styles from "./CourseAsideProgressPanel.module.scss";
import { Link } from "react-router-dom";

const CourseAsideProgressPanel = ({ courseLessons, courseId }) => {
  const compleatedLessons = courseLessons.filter(
    ({ status }) => status === "compleated"
  );
  // const activeLesson = courseLessons.find(({ status }) => status === "active");
  // const lockedLessons = courseLessons.filter(({ status }) => !status);
  const progress = Math.round(
    (compleatedLessons.length / courseLessons.length) * 100
  );
  const progressItems = courseLessons.map(
    ({ lessonId, title, status, number }) => ({
      id: lessonId,
      label: title,
      status,
      number,
    })
  );

  console.log(compleatedLessons);
  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <h4>Content:</h4>
        <div className={styles.progressWrapper}>
          <span>Progress:</span>
          <ProgressBar value={progress} width={172} height={24} />
        </div>
        <div className={styles.progressListWrapper}>
          <ProgressList items={progressItems} />
        </div>
      </div>
      <Link
        className={styles.examLink}
        to={`/course/${courseId}/exam-certificate`}
      >
        <span>Go to exam</span>
        <ExamIcon />
      </Link>
    </div>
  );
};

export default CourseAsideProgressPanel;
