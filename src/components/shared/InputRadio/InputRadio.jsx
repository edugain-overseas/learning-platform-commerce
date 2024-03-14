import React from "react";
import styles from "./InputRadio.module.scss";

const InputRadio = ({
  className,
  name,
  value,
  checked,
  onChange,
  labelText,
}) => {
  return (
    <label
      className={`${className} ${
        checked ? `${styles.option} ${styles.optionChecked}` : styles.option
      }`}
    >
      <span className={styles.radioBtn}></span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {labelText}
    </label>
  );
};

export default InputRadio;
