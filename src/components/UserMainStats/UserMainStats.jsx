import React from "react";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as TaskViewIcon } from "../../images/icons/task-view.svg";
import { ReactComponent as TaskCompletedIcon } from "../../images/icons/task-completed.svg";
import styles from "./UserMainStats.module.scss";

const UserMainStats = ({
  hours,
  minutes,
  progressCourses,
  competedCourses,
}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <ClockIcon className={styles.clock} />
        <div className={styles.divider}></div>
        <div className={styles.info}>
          <span className={styles.value}>{`${hours}h ${minutes}m`}</span>
          <span className={styles.name}>studying time</span>
        </div>
      </div>
      <div>
        <TaskViewIcon />
        <div className={styles.divider}></div>
        <div className={styles.info}>
          <span className={styles.value}>{`${progressCourses} courses`}</span>
          <span className={styles.name}>in progress</span>
        </div>
      </div>
      <div>
        <TaskCompletedIcon />
        <div className={styles.divider}></div>
        <div className={styles.info}>
          <span className={styles.value}>{`${progressCourses} completed`}</span>
          <span className={styles.name}>courses</span>
        </div>
      </div>
    </div>
  );
};

export default UserMainStats;
