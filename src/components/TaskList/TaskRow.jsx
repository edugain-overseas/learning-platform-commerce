import React from "react";
import { ReactComponent as ArrowRightIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as TaskViewIcon } from "../../images/icons/task-view.svg";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as QuestionsIcon } from "../../images/icons/document-question.svg";
import { ReactComponent as ComplietedIcon } from "../../images/icons/task-check.svg";
import { Link } from "react-router-dom";
import styles from "./TaskList.module.scss";

const TaskRow = ({ task }) => {
  console.log(task);
  return (
    <li
      className={`${styles.row} ${
        task.status === "completed" ? styles.completedRow : ""
      }`}
    >
      <Link
        to={task.status ? `/task/${task.id}` : null}
        // to={`/task/${task.id}`}
        className={styles.rowLink}
      >
        <div className={styles.titleWrapper}>
          <span className={styles.taskTitle} title={task.title}>
            <span className={styles.pointer}></span>
            {task.title}
            <span className={styles.openBtn}>
              <ArrowRightIcon />
            </span>
          </span>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.secondaryWrapper}>
            <TaskViewIcon />
            <span>{`Type of activity: ${task.type}`}</span>
          </div>
          {task.status && task.status !== "blocked" ? (
            <div className={styles.secondaryWrapper}>
              <ComplietedIcon />
              <span>
                Status:{" "}
                <span
                  className={
                    task.status === "completed"
                      ? `${styles.success}`
                      : `${styles.active}`
                  }
                >
                  {task.status}
                </span>
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
                  <span>{`Questions: ${task.q_count}`}</span>
                </div>
              )}
            </>
          )}
        </div>
      </Link>
    </li>
  );
};

export default TaskRow;
