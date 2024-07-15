import React from "react";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/selectors";
import { useListMode } from "../../context/ListModeContext";
import TaskCard from "./TaskCard";
import TaskRow from "./TaskRow";
import styles from "./TaskList.module.scss";
import CreateNewLessonBtn from "../CreateNewLessonBtn/CreateNewLessonBtn";

const TaskList = ({ tasks }) => {
  const isModer = useSelector(getUserType) === "moder";
  const { selectedListModeIndex } = useListMode();

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
          <TaskRow key={task.id} task={task} />
        ) : (
          <TaskCard key={task.id} task={task} />
        )
      )}
      {isModer && (
        <li className={styles.CreateNewLessonItem}>
          <CreateNewLessonBtn />
        </li>
      )}
    </ul>
  );
};

export default TaskList;
