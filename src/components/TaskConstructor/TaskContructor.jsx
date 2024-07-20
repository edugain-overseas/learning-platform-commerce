import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLessonByIdThunk } from "../../redux/lesson/operation";
import LectureConstructor from "./LectureConstructor/LectureConstructor";
import TestConstructor from "./TestConstructor/TestConstructor";
import { getAllLessons } from "../../redux/lesson/selectors";
import styles from "./TaskConstructor.module.scss";
import LectureHeader from "../TasksHeader/LectureHeader";
import TestHeader from "../TasksHeader/TestHeader";

const TaskContructor = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const lessons = useSelector(getAllLessons);
  const task = lessons.find(({ id }) => id === +taskId);
  const taskType = task?.type;

  useEffect(() => {
    if (taskId) {
      dispatch(getLessonByIdThunk(+taskId));
    }
    // eslint-disable-next-line
  }, [taskId]);

  const getConstructorByType = () => {
    switch (taskType) {
      case "lecture":
        return (
          <>
            <LectureHeader lecture={task} />
            <LectureConstructor />
          </>
        );
      case "test":
        return (
          <>
            <TestHeader test={task} />
            <TestConstructor />
          </>
        );
      default:
        // return <p>Unknown lesson</p>
        return (
          <>
            {/* <TestHeader test={task} /> */}
            <TestConstructor />
          </>
        );
    }
  };

  return (
    <div className={styles.constructorWrapper}>{getConstructorByType()}</div>
  );
};

export default TaskContructor;
