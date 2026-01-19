import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLessonByIdThunk } from "../../redux/lesson/operation";
import { getAllLessons } from "../../redux/lesson/selectors";
import Lecture from "../../components/Lecture/Lecture";
import Test from "../../components/Test/Test";
import styles from "./TaskPage.module.scss";
import { getAllCourses } from "../../redux/course/selectors";

const TaskPage = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();

  const lessons = useSelector(getAllLessons);
  const courses = useSelector(getAllCourses);

  const task = lessons.find(({ id }) => id === +taskId);
  const taskType = task?.type;

  const courseId = courses.find((course) =>
    course.lessons.find((lesson) => lesson.id === +taskId)
  )?.id;

  useEffect(() => {
    if (taskId && !task) {
      dispatch(getLessonByIdThunk(+taskId));
    }
    // eslint-disable-next-line
  }, [taskId]);

  return (
    <div className={styles.pageWrapper}>
      {taskType === "lecture" && <Lecture lecture={task} />}
      {taskType === "test" && <Test test={task} />}
      {taskType === "exam" && (
        <Navigate to={`/course/${courseId}/exam-certificate`} />
      )}
    </div>
  );
};

export default TaskPage;
