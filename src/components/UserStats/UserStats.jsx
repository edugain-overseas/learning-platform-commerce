import React from "react";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as TaskViewIcon } from "../../images/icons/task-view.svg";
import { ReactComponent as TaskCompletedIcon } from "../../images/icons/task-completed.svg";
import { useSelector } from "react-redux";
import { getActiveTime } from "../../redux/user/selectors";
import { useActiveTime } from "../../context/activeTimeContext";
import { convertMillisecondsToHoursAndMinutes } from "../../utils/formatTime";
import styles from "./UserStats.module.scss";

const UserStats = ({ progressCourses, completedCourses, isUserLoggedIn }) => {
  const prevActiveTime = useSelector(getActiveTime);
  const activeTime = useActiveTime();
  const activeTimeToDisplay = prevActiveTime
    ? prevActiveTime + activeTime
    : activeTime;

  const { hours, minutes } =
    convertMillisecondsToHoursAndMinutes(activeTimeToDisplay);

  return (
    <div className={`${styles.wrapper}`}>
      <div>
        <ClockIcon className={styles.clock} />
        <div className={styles.divider}></div>
        <div className={styles.info}>
          <span className={styles.value}>
            {isUserLoggedIn ? `${hours}h ${minutes}m` : "0h 0m"}
          </span>
          <span className={styles.name}>studying time</span>
        </div>
      </div>
      <div>
        <TaskViewIcon />
        <div className={styles.divider}></div>
        <div className={styles.info}>
          <span className={styles.value}>
            {isUserLoggedIn ? `${progressCourses} courses` : "0 courses"}
          </span>
          <span className={styles.name}>in progress</span>
        </div>
      </div>
      <div>
        <TaskCompletedIcon />
        <div className={styles.divider}></div>
        <div className={styles.info}>
          <span className={styles.value}>
            {isUserLoggedIn ? `${completedCourses} completed` : "0 completed"}
          </span>
          <span className={styles.name}>courses</span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
