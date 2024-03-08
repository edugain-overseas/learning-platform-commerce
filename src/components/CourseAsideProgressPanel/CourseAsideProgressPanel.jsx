import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ExamIcon } from "../../images/icons/exam.svg";
import ProgressBar from "../shared/ProgressBar/ProgressBar";
import ProgressList from "../shared/ProgressList/ProgressList";
import styles from "./CourseAsideProgressPanel.module.scss";

const CourseAsideProgressPanel = ({ courseLessons, courseId, progress }) => {
  const progressItems = courseLessons.map(({ id, title, status, number }) => ({
    id,
    label: title,
    status,
    number,
  }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <h4>Content:</h4>
        <div className={styles.progressWrapper}>
          <span>Progress:</span>
          <ProgressBar
            value={progress}
            width={172}
            height={24}
            disabled={progress === undefined}
          />
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
