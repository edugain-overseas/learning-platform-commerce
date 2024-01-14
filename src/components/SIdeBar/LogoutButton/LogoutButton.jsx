import React from "react";
import { ReactComponent as LogoutIcon } from "../../../images/icons/logout.svg";
import styles from "./LogoutButton.module.scss";

const LogoutButton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.narrowed}>
        <button type="button">
          <LogoutIcon />
        </button>
      </div>
      <div className={styles.expanded} id="expanded">
        <button>
          <span className={styles.icon}>
            <LogoutIcon />
          </span>
          <span className={styles.label}>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;
