import React from "react";
import { InputNumber } from "antd";
import styles from "../../TestConstructor.module.scss";

const ScoreInput = ({ value, maxValue, setValue }) => {
  return (
    // <label className={styles.scoreWrapper}>
    //   <span>Score:</span>
    <InputNumber
      min={1}
      max={maxValue}
      value={value}
      onChange={setValue}
      size="small"
      className={styles.scoreInput}
      addonBefore="Score:"
      addonAfter="/ 40"
    />
    // </label>
  );
};

export default ScoreInput;
