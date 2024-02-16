import React from "react";
import { useParams } from "react-router-dom";
import styles from "./TaskPage.module.scss";
import { lessons } from "../../assets/courses";
import Lecture from "../../components/Lecture/Lecture";
import Test from "../../components/Test/Test";

const TaskPage = () => {
  const { taskId } = useParams();
  const task = lessons.find(({ lessonId }) => lessonId === +taskId);
  const taskType = task.type;
  console.log(task);
  return (
    <div className={styles.pageWrapper}>
      {taskType === "lecture" && <Lecture lecture={task} />}
      {taskType === "test" && <Test test={task} />}
    </div>
  );
};

export default TaskPage;
