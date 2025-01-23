import React from "react";
import { ReactComponent as ExamIcon } from "../../images/icons/exam.svg";
import ProgressBar from "../shared/ProgressBar/ProgressBar";
import ProgressList from "../shared/ProgressList/ProgressList";
import styles from "./CourseAsideProgressPanel.module.scss";
import { useNavigate } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";

const CourseAsideProgressPanel = ({ courseLessons, courseId, progress }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = useMessage();
  const progressItems = courseLessons.map(({ id, title, status, number }) => ({
    id,
    label: title,
    status,
    number,
    link: status && status !== "blocked" ? `/task/${id}` : null,
  }));

  const exam = courseLessons.find((lesson) => lesson.type === "exam");

  const blockedLessonMessage = () =>
    messageApi.info({
      content: "You can not access this lesson becouse it is blocked",
      duration: 3,
    });

  const handleNavigateToExam = (e) => {
    if (exam.status === "blocked") {
      blockedLessonMessage();
    } else {
      navigate(`/course/${courseId}/exam-certificate`);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h4>Content:</h4>
          <div className={styles.progressWrapper}>
            <span>Progress:</span>
            <ProgressBar
              value={progress}
              width={172}
              height={24}
              disabled={progress === undefined || progress === null}
            />
          </div>
          <div className={styles.progressListWrapper}>
            <ProgressList
              items={progressItems}
              blockedLessonMessage={blockedLessonMessage}
            />
          </div>
        </div>
        <button
          className={`${styles.examLink} ${
            exam?.status === "blocked" ? styles.disabled : ""
          }`}
          onClick={handleNavigateToExam}
        >
          <span>Go to exam</span>
          <ExamIcon />
        </button>
      </div>
    </>
  );
};

export default CourseAsideProgressPanel;
