import React from "react";
import LectureHeader from "../TasksHeader/LectureHeader";
import LectureContent from "./LectureContent";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import { lessons } from "../../assets/courses";
import styles from "./Lecture.module.scss";

const Lecture = ({ lecture }) => {
  const { courseId } = lecture;

  const courseLessons = lessons.filter(
    ({ courseId: course_id }) => course_id === +courseId
  );
  
  return (
    <div className={styles.lectureWrapper}>
      <LectureHeader lecture={lecture} />
      <div className={styles.bodyWrapper}>
        <LectureContent lecture={lecture} />
        <div className={styles.progressWrapper}>
          <CourseAsideProgressPanel
            courseLessons={courseLessons}
            courseId={courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default Lecture;
