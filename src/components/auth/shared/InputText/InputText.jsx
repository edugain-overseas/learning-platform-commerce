import React from "react";
import styles from "./InputText.module.scss";
import {
  validateEmail,
  validateText,
  validateCode,
} from "../../../../utils/inputsValidateHandler";

const isStateValid = (name, value) => {
  switch (name) {
    case "Email":
      return validateEmail(value);
    case "Verificarion code":
      return validateCode(value);
    case "Recovery code":
      return validateCode(value);
    default:
      return validateText(value);
  }
};

const InputText = ({
  name,
  width,
  height,
  value,
  onChange,
  isError = false,
  resetError = () => {},
  disabled = false,
}) => {
  return (
    <label
      className={`${styles.inputWrapper} ${
        isStateValid(name, value) && !isError
          ? styles.valid
          : isError
          ? styles.error
          : ""
      }`}
      style={width || height ? { width, height } : {}}
    >
      <span
        className={`${styles.label} ${
          name === "Recovery code" ? styles.newPassword : ""
        }`}
      >
        {name}
      </span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => {
          resetError();
          onChange(e.target.value);
        }}
        disabled={disabled}
      />
    </label>
  );
};

export default InputText;
