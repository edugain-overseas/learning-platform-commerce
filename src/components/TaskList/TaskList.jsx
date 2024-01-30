import React from "react";
import styles from "./TaskList.module.scss";
import TaskCard from "./TaskCard";
import { useListMode } from "../../context/ListModeContext";
import TaskRow from "./TaskRow";

const TaskList = ({ tasks }) => {
  const { selectedListModeIndex } = useListMode();
  console.log(selectedListModeIndex);
  const sortedItemsByNumber = [...tasks].sort(
    (itemA, itemB) => itemA.number - itemB.number
  );

  return (
    <ul
      className={`${styles.listWrapper} ${
        selectedListModeIndex ? styles.rowWrapper : styles.cardWrapper
      }`}
    >
      {sortedItemsByNumber.map((task) =>
        selectedListModeIndex ? (
          <TaskRow key={task.lessonId} task={task} />
        ) : (
          <TaskCard key={task.lessonId} task={task} />
        )
      )}
    </ul>
  );
};

export default TaskList;
