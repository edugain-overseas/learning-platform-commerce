import { useListMode } from "../../context/ListModeContext";
import TaskCard from "./TaskCard";
import TaskRow from "./TaskRow";
import styles from "./TaskList.module.scss";

const StudentList = ({ items }) => {
  const { selectedListModeIndex } = useListMode();

  return (
    <ul
      className={`${styles.listWrapper} ${
        selectedListModeIndex ? styles.rowWrapper : styles.cardWrapper
      }`}
    >
      {items.map((task) => (
        <li key={task.id}>
          {selectedListModeIndex ? (
            <TaskRow task={task} />
          ) : (
            <TaskCard task={task} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
