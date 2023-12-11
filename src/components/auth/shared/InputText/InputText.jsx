import React from "react";
import styles from "./InputText.module.scss";
import { getInputIcon } from "../../../../utils/getInputIcon";

const InputText = ({ name, value, onChange }) => {
  return (
    <label className={styles.inputWrapper}>
      <span className={styles.label}>{name}</span>
      {getInputIcon(name, styles)}
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default InputText;
