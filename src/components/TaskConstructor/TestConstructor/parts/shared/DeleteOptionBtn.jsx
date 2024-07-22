import React from "react";
import { ReactComponent as TrashIcon } from "../../../../../images/icons/trashRounded.svg";
import styles from "../../TestConstructor.module.scss";

const DeleteOptionBtn = ({
  handleDeleteOption,
  matching = false,
  disabled = false,
}) => {
  const btnTitle = matching ? "Delete this pair" : "Delete this option";

  return (
    <button
      className={styles.deleteOptionBtn}
      onClick={handleDeleteOption}
      title={btnTitle}
      disabled={disabled}
    >
      <TrashIcon />
    </button>
  );
};

export default DeleteOptionBtn;
