import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLessonByIdThunk } from "../../redux/lesson/operation";
import LectureConstructor from "./LectureConstructor/LectureConstructor";
import TestConstructor from "./TestConstructor/TestConstructor";
import { getAllLessons } from "../../redux/lesson/selectors";
import styles from "./TaskConstructor.module.scss";

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
        return <LectureConstructor />;
      case "test":
        return <TestConstructor />;
      default:
        //   return <p>Unknown lesson</p>;
        return <LectureConstructor />;
    }
  };

  return (
    <div className={styles.constructorWrapper}>
      <div>Header</div>
      {getConstructorByType()}
    </div>
  );
};

export default TaskContructor;
