import React from "react";
import styles from "./InputText.module.scss";
import { getInputIcon } from "../../../../utils/getInputIcon";
import {
  validateEmail,
  validateText,
} from "../../../../utils/inputsValidateHandler";

const InputText = ({ name, value, onChange }) => {
  return (
    <label
      className={`${styles.inputWrapper} ${
        (name === "email" ? validateEmail(value) : validateText(value)) &&
        styles.valid
      }`}
    >
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
