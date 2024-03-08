import React from "react";
import { ReactComponent as CompleteIcon } from "../../../images/icons/checked.svg";
import styles from "./CompleteBtn.module.scss";
import Spinner from "../../Spinner/Spinner";

const CompleteBtn = ({ onClick = () => {}, state }) => {
  const getContentByState = () => {
    switch (state) {
      case "default":
        return (
          <button
            type="button"
            className={styles.completeBtn}
            onClick={onClick}
          >
            <span>Complete</span>
            <CompleteIcon />
          </button>
        );
      case "pending":
        return (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        );
      case "fulfilled":
        return (
          <button type="button" className={styles.completeBtn} disabled={true}>
            <CompleteIcon />
          </button>
        );
      default:
        break;
    }
  };
  return getContentByState();
};

export default CompleteBtn;
