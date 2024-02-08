import React from "react";
import styles from "./InputText.module.scss";
import {
  validateEmail,
  validateText,
  validateCode,
} from "../../../../utils/inputsValidateHandler";

const isStateValid = (name, value) => {
  switch (name) {
    case "email":
      return validateEmail(value);
    case "verificarion code":
      return validateCode(value);
    default:
      return validateText(value);
  }
};

const InputText = ({ name, value, onChange }) => {
  return (
    <label
      className={`${styles.inputWrapper} ${
        isStateValid(name, value) ? styles.valid : ""
      }`}
    >
      <span className={styles.label}>{name}</span>
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
