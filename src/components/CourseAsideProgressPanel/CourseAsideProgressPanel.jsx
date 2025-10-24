import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import { ReactComponent as ExamIcon } from "../../images/icons/exam.svg";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import ProgressBar from "../shared/ProgressBar/ProgressBar";
import ProgressList from "../shared/ProgressList/ProgressList";
import styles from "./CourseAsideProgressPanel.module.scss";

const CourseAsideProgressPanel = ({ courseId }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = useNotificationMessage();

  const course = useSelector(getAllCourses)?.find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons;
  const courseProgress = course?.progress;

  const progressItems = courseLessons?.map(({ id, title, status, number }) => ({
    id,
    label: title,
    status,
    number,
    link: status && status !== "blocked" ? `/task/${id}` : null,
  }));

  const exam = courseLessons?.find((lesson) => lesson.type === "exam");

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
          <div className={styles.progressWrapper}>
            <span>Progress:</span>
            <ProgressBar value={courseProgress} width={172} height={24} />
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
