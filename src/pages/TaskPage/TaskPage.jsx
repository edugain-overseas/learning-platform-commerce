import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLessonByIdThunk } from "../../redux/lesson/operation";
import { getAllLessons } from "../../redux/lesson/selectors";
import Lecture from "../../components/Lecture/Lecture";
import Test from "../../components/Test/Test";
import Exam from "../../components/Exam/Exam";
import styles from "./TaskPage.module.scss";

const TaskPage = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();

  const lessons = useSelector(getAllLessons);

  const task = lessons.find(({ id }) => id === +taskId);
  const taskType = task?.type;

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
      {taskType === "exam" && <Exam exam={task} />}
    </div>
  );
};

export default TaskPage;
