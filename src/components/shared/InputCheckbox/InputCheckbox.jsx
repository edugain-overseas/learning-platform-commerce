import React from "react";
import { ReactComponent as CheckIcon } from "../../../images/icons/check.svg";
import styles from "./InputCheckbox.module.scss";

const InputCheckbox = ({
  className,
  name,
  // value,
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
      <span className={styles.ckeckbox}>{checked && <CheckIcon />}</span>
      <input
        type="checkbox"
        name={name}
        // value={value}
        checked={checked}
        onChange={onChange}
      />
      {labelText}
    </label>
  );
};

export default InputCheckbox;
