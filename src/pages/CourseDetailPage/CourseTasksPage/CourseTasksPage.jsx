import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";
import { ReactComponent as LectureIcon } from "../../../images/icons/document-text.svg";
import { ReactComponent as TestIcon } from "../../../images/icons/test.svg";
import { ReactComponent as TranslationIcon } from "../../../images/icons/translate.svg";
import TaskList from "../../../components/TaskList/TaskList";
import CourseAsideProgressPanel from "../../../components/CourseAsideProgressPanel/CourseAsideProgressPanel";
import styles from "./CourseTasksPage.module.scss";
import { getUserType } from "../../../redux/user/selectors";

const CourseTasksPage = () => {
  const { courseId } = useParams();
  const courses = useSelector(getAllCourses);
  const isModer = useSelector(getUserType) === "moder";
  const course = courses.find(({ id }) => id === +courseId);
  const courseLessons = course?.lessons;
  const progress = course?.progress;

  const lectures = courseLessons?.filter(({ type }) => type === "lecture");
  const tests = courseLessons?.filter(({ type }) => type === "test");

  console.log(courseLessons?.length, isModer);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContentWrapper}>
        <div className={styles.tasksPanel}>
          <h3>Tasks courses</h3>
          <ul className={styles.attributesList}>
            <li>
              <LectureIcon />
              <span>{`Lectures: ${lectures?.length}`}</span>
            </li>
            <li>
              <TestIcon />
              <span>{`Tests: ${tests?.length}`}</span>
            </li>
            <li>
              <TranslationIcon />
              <span>English (full audio & text)</span>
            </li>
          </ul>
        </div>
        <div className={styles.listWrapper}>
          <TaskList tasks={courseLessons} />
        </div>
      </div>
      {!!courseLessons?.length && !isModer && (
        <CourseAsideProgressPanel
          courseLessons={courseLessons}
          courseId={courseId}
          progress={progress}
        />
      )}
    </div>
  );
};

export default CourseTasksPage;
