import React from "react";
import { ReactComponent as DeleteIcon } from "../../../../images/icons/delete.svg";
import styles from "./FileUploader.module.scss";

const DeleteBtn = ({ onDelete }) => {
  return (
    <button type="button" onClick={onDelete} className={styles.deleteButton}>
      <DeleteIcon className={styles.deleteIcon} />
    </button>
  );
};

export default DeleteBtn;
