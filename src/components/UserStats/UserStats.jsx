import React from "react";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrowDown.svg";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as TaskViewIcon } from "../../images/icons/task-view.svg";
import { ReactComponent as TaskCompletedIcon } from "../../images/icons/task-completed.svg";
import InsetBtn from "../shared/InsetBtn/InsetBtn";
import styles from "./UserStats.module.scss";

const UserStats = ({
  hours,
  minutes,
  progressCourses,
  completedCourses,
  minimized,
  handleCollapseCerficates,
}) => {
  return (
    <div className={`${styles.wrapper} ${minimized ? styles.minimized : ""}`}>
      {minimized && <h3>My Profile</h3>}
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
          <span
            className={styles.value}
          >{`${completedCourses} completed`}</span>
          <span className={styles.name}>courses</span>
        </div>
      </div>
      {minimized && (
        <InsetBtn
          icon={<ArrowDownIcon className={styles.arrowIcon} />}
          width="24rem"
          height="24rem"
          onClick={handleCollapseCerficates}
        />
      )}
    </div>
  );
};

export default UserStats;
