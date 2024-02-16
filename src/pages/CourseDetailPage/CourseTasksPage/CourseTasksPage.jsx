import React from "react";
import { useParams } from "react-router-dom";
import { lessons } from "../../../assets/courses";
import { ReactComponent as LectureIcon } from "../../../images/icons/document-text.svg";
import { ReactComponent as TestIcon } from "../../../images/icons/test.svg";
import { ReactComponent as TranslationIcon } from "../../../images/icons/translate.svg";
import styles from "./CourseTasksPage.module.scss";
import TaskList from "../../../components/TaskList/TaskList";
import CourseAsideProgressPanel from "../../../components/CourseAsideProgressPanel/CourseAsideProgressPanel";

const CourseTasksPage = () => {
  const { courseId } = useParams();

  const courseLessons = lessons.filter(
    ({ courseId: course_id }) => course_id === +courseId
  );

  const lectures = courseLessons.filter(({ type }) => type === "lecture");
  const tests = courseLessons.filter(({ type }) => type === "test");
  console.log(courseLessons, lectures, tests);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContentWrapper}>
        <div className={styles.tasksPanel}>
          <h3>Tasks courses</h3>
          <ul className={styles.attributesList}>
            <li>
              <LectureIcon />
              <span>{`Lectures: ${lectures.length}`}</span>
            </li>
            <li>
              <TestIcon />
              <span>{`Tests: ${tests.length}`}</span>
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
      <CourseAsideProgressPanel courseLessons={courseLessons} courseId={courseId}/>
    </div>
  );
};

export default CourseTasksPage;
