import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/selectors";
import { serverName } from "../../http/sever";
import { ReactComponent as ArrowRightIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as TaskViewIcon } from "../../images/icons/task-view.svg";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as QuestionsIcon } from "../../images/icons/document-question.svg";
import { ReactComponent as ComplietedIcon } from "../../images/icons/task-check.svg";
import poster from "../../images/MedicineBackground.png";
import styles from "./TaskList.module.scss";

const TaskCard = ({ task }) => {
  const isModer = useSelector(getUserType) === "moder";
  const canUserGoToTask = (task.status && task.status !== "blocked") || isModer;

  return (
    <li
      className={`${styles.card} ${
        task.status === "completed" ? styles.completedCard : ""
      }`}
    >
      <Link
        to={canUserGoToTask ? `/task/${task.id}` : null}
        className={styles.cardLink}
      >
        <img
          className={styles.poster}
          src={task.image_path ? `${serverName}/${task.image_path}` : poster}
          alt={task.title}
        />
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>
            <span className={styles.taskTitle} title={task.title}>
              {task.title}
              <span className={styles.openBtn}>
                <ArrowRightIcon />
              </span>
            </span>
          </div>
          <div className={styles.secondaryWrapper}>
            <TaskViewIcon />
            <span>{`Type of activity: ${task.type}`}</span>
          </div>
          {task.status === "completed" ? (
            <div className={styles.secondaryWrapper}>
              <ComplietedIcon />
              <span>
                Status: <span className={styles.success}>Completed</span>
              </span>
            </div>
          ) : (
            <>
              <div className={styles.secondaryWrapper}>
                <ClockIcon />
                <span>{`Scheduled time: ${task.scheduled_time} min`}</span>
              </div>
              {task.type === "test" && (
                <div className={styles.secondaryWrapper}>
                  <QuestionsIcon />
                  <span>{`Questions: ${task.count_questions}`}</span>
                </div>
              )}
            </>
          )}
        </div>
      </Link>
    </li>
  );
};

export default TaskCard;
