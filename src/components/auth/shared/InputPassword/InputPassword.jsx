import React, { useState } from "react";
import { validatePassword } from "../../../../utils/inputsValidateHandler";
import { ReactComponent as EyeIcon } from "../../../../images/icons/eye.svg";
import { ReactComponent as EyeInvisibleIcon } from "../../../../images/icons/eye-invisible.svg";
import styles from "./InputPassword.module.scss";

const InputPassword = ({
  name,
  value,
  onChange,
  isError = false,
  resetError = () => {},
}) => {
  const [isShow, setIsShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsShow((prev) => !prev);
  };

  return (
    <label
      className={`${styles.inputWrapper} ${
        validatePassword(value) && !isError
          ? styles.valid
          : isError
          ? styles.error
          : ""
      }`}
    >
      <span
        className={`${styles.label} ${
          name === "New password" ? styles.newPassword : ""
        }`}
      >
        {name}
      </span>
      <div className={styles.inputInner}>
        <input
          type={isShow ? "text" : "password"}
          name={name}
          value={value}
          onChange={(e) => {
            resetError();
            onChange(e.target.value);
          }}
        />
        <span className={styles.showBtn} onClick={(e) => handleClick(e)}>
          {!isShow ? <EyeInvisibleIcon /> : <EyeIcon />}
        </span>
      </div>
    </label>
  );
};

export default InputPassword;
