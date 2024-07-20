import React from "react";
import styles from "../../TestConstructor.module.scss";
import AddOptionBtn from "./AddOptionBtn";

const OptionsWrapper = ({
  children,
  handleAddOption,
  canAddOption = true,
  matching = false,
}) => {
  return (
    <div className={styles.optionsWrapper}>
      <ul className={styles.optionsList}>{children}</ul>
      <AddOptionBtn
        handleAddNewOption={handleAddOption}
        disabled={!canAddOption}
        matching={matching}
      />
    </div>
  );
};

export default OptionsWrapper;
