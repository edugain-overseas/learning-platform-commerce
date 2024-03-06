import React from "react";
import styles from "./ProgressList.module.scss";

const ProgressListItem = ({ item }) => {
  return (
    <li>
      <div
        className={`${styles.progressIconOuter} ${
          item.status === "completed"
            ? styles.success
            : item.status === "active"
            ? styles.inProgress
            : ""
        }`}
      >
        <div className={styles.progressIconInner}></div>
      </div>
      <span>{item.label}</span>
    </li>
  );
};

export default ProgressListItem;
