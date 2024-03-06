import React from "react";
import { ReactComponent as CompleteIcon } from "../../../images/icons/checked.svg";
import styles from "./CompleteBtn.module.scss";

const CompleteBtn = ({onClick = () => {}}) => {
  return (
    <button type="button" className={styles.completeBtn} onClick={onClick}>
      <span>Complete</span>
      <CompleteIcon />
    </button>
  );
};

export default CompleteBtn;
