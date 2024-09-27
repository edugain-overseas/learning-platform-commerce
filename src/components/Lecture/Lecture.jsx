import React from "react";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import LectureHeader from "../TasksHeader/LectureHeader";
import LectureContent from "./LectureContent";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import styles from "./Lecture.module.scss";
import { SelectionProvider } from "../../context/SelectionContext";

const Lecture = ({ lecture }) => {
  const { course_id: courseId, id } = lecture;
  const courses = useSelector(getAllCourses);
  const course = courses.find(({ id }) => id === +courseId);
  const courseName = course?.title;
  const courseLessons = course?.lessons;
  const status = courseLessons?.find(
    ({ id: lectureId }) => lectureId === id
  )?.status;

  return (
    <div className={styles.lectureWrapper}>
      <SelectionProvider>
        <LectureHeader lecture={lecture} />
        <div className={styles.bodyWrapper}>
          <LectureContent lecture={{ ...lecture, status, courseName }} />
          <div className={styles.progressWrapper}>
            <CourseAsideProgressPanel
              courseLessons={courseLessons ? courseLessons : []}
              courseId={courseId}
              progress={course?.progress}
            />
          </div>
        </div>
      </SelectionProvider>
    </div>
  );
};

export default Lecture;
