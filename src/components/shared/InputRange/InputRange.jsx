import React from "react";
import styles from "./InputRange.module.scss";

const InputRange = ({
  width = "100%",
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.1,
}) => {
  return (
    <div className={styles.inputChangeContainer} style={{ width }}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={onChange}
      />
      <div
        className={styles.value}
        style={{ width: `calc(${+value / max} * 100%)` }}
      ></div>
    </div>
  );
};

export default InputRange;
