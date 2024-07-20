import React from "react";
import { ReactComponent as PlusIcon } from "../../../../../images/icons/plusRounded.svg";
import styles from "../../TestConstructor.module.scss";

const AddOptionBtn = ({
  handleAddNewOption,
  disabled = false,
  matching = false,
}) => {
  const btnTitle = matching ? "Add one more pair" : "Add option";

  return (
    <button
      className={styles.addNewOptionBtn}
      disabled={disabled}
      onClick={handleAddNewOption}
      title={
        disabled
          ? "You can not add more options for this type of test"
          : btnTitle
      }
    >
      <PlusIcon />
      <span>{btnTitle}</span>
    </button>
  );
};

export default AddOptionBtn;
