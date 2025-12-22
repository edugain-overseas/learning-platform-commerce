import { useListMode } from "../../context/ListModeContext";
import TaskCard from "./TaskCard";
import TaskRow from "./TaskRow";
import styles from "./TaskList.module.scss";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";

const StudentList = ({ items }) => {
  const { selectedListModeIndex } = useListMode();
  const [messageApi, contextProvider] = useNotificationMessage();

  return (
    <>
      {contextProvider}
      <ul
        className={`${styles.listWrapper} ${
          selectedListModeIndex ? styles.rowWrapper : styles.cardWrapper
        }`}
      >
        {items.map((task) => (
          <li key={task.id}>
            {selectedListModeIndex ? (
              <TaskRow task={task} messageApi={messageApi} />
            ) : (
              <TaskCard task={task} messageApi={messageApi} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default StudentList;
