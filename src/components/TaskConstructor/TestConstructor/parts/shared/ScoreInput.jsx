import React from "react";
import { InputNumber } from "antd";
import styles from "../../TestConstructor.module.scss";

const ScoreInput = ({ value, maxValue, setValue, score }) => {
  return (
    <InputNumber
      min={1}
      max={maxValue}
      value={value}
      onChange={setValue}
      size="small"
      className={styles.scoreInput}
      addonBefore="Score:"
      addonAfter={`/ ${score}`}
    />
  );
};

export default ScoreInput;
