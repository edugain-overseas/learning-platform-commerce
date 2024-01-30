import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as TaskViewIcon } from "../../images/icons/task-view.svg";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as QuestionsIcon } from "../../images/icons/document-question.svg";
import { ReactComponent as ComplietedIcon } from "../../images/icons/task-check.svg";
import poster from "../../images/MedicineBackground.png";
import styles from "./TaskList.module.scss";

const TaskCard = ({ task }) => {
  return (
    <li
      className={`${styles.card} ${
        task.status === "compleated" ? styles.completedCard : ""
      }`}
    >
      <Link
        to={task.status ? `/task/${task.lessonId}` : null}
        className={styles.cardLink}
      >
        <img className={styles.poster} src={poster} alt="" />
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>
            <span className={styles.taskTitle}>
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
          {task.status === "compleated" ? (
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
                <span>{`Scheduled time: ${task.duration} min`}</span>
              </div>
              {task.type === "test" && (
                <div className={styles.secondaryWrapper}>
                  <QuestionsIcon />
                  <span>{`Questions: 8`}</span>
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
