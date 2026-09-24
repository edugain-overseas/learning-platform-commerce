import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import LectureHeader from "../TasksHeader/LectureHeader";
import LectureContent from "./LectureContent";
import CourseAsideProgressPanel from "../CourseAsideProgressPanel/CourseAsideProgressPanel";
import styles from "./Lecture.module.scss";
import { SelectionProvider } from "../../context/SelectionContext";
import TaskLayout from "../shared/TaskLayout/TaskLayout";
import { confirmLectureThunk } from "../../redux/lesson/operation";

const Lecture = ({ lecture }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { course_id: courseId, id } = lecture;
  const courses = useSelector(getAllCourses);
  const course = courses?.find(({ id }) => id === +courseId);
  const courseName = course?.title;
  const courseLessons = course?.lessons;
  const status = courseLessons?.find(
    ({ id: lectureId }) => lectureId === id,
  )?.status;
  const dispatch = useDispatch();

  const confirmLecture = async () => {
    setIsLoading(true);
    await dispatch(confirmLectureThunk(lecture.id)).unwrap();
    setIsLoading(false);
  };

  return (
    <div className={styles.lectureWrapper}>
      <SelectionProvider>
        <LectureHeader lecture={lecture} isLoading={isLoading} />
        <TaskLayout.Container>
          <TaskLayout.Content>
            <LectureContent
              lecture={{ ...lecture, status, courseName }}
              confirmLecture={confirmLecture}
              isLoading={isLoading}
            />
          </TaskLayout.Content>
          <TaskLayout.Tools>
            <CourseAsideProgressPanel
              courseLessons={courseLessons ? courseLessons : []}
              courseId={courseId}
              progress={course?.progress}
            />
          </TaskLayout.Tools>
        </TaskLayout.Container>
      </SelectionProvider>
    </div>
  );
};

export default Lecture;
