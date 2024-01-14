import React from "react";
import { ReactComponent as SupportIcon } from "../../../images/icons/support.svg";
import styles from "./SupportBtn.module.scss";

const SupportBtn = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.narrowed}>
        <button type="button">
          <SupportIcon />
        </button>
      </div>
      <div className={styles.expanded} id="expanded">
        <span>Manager's support</span>
      </div>
    </div>
  );
};

export default SupportBtn;
