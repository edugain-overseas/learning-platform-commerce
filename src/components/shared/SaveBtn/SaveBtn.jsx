import React from "react";
import { ReactComponent as SaveIcon } from "../../../images/icons/save.svg";
import Spinner from "../../Spinner/Spinner";
import styles from "./SaveBtn.module.scss";

const SaveBtn = ({ handleClick, className, isLoading }) => {
  return (
    <button
      className={`${styles.saveBtn} ${className ? className : ""}`}
      onClick={handleClick}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SaveIcon className={styles.saveIcon} />
          <span>Save</span>
        </>
      )}
    </button>
  );
};

export default SaveBtn;
