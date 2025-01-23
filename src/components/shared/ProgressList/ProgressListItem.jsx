import React from "react";
import styles from "./ProgressList.module.scss";
import { Link } from "react-router-dom";

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
      <Link to={item.link} className={styles.progressLink}>
        <span title={item.label}>{item.label}</span>
      </Link>
    </li>
  );
};

export default ProgressListItem;
