import React, { useState } from "react";
import { getInputIcon } from "../../../../utils/getInputIcon";
import styles from "./InputPassword.module.scss";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { validatePassword } from "../../../../utils/inputsValidateHandler";

const InputPassword = ({ name, value, onChange }) => {
  const [isShow, setIsShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsShow((prev) => !prev);
  };

  return (
    <label
      className={`${styles.inputWrapper} ${
        validatePassword(value) && styles.valid
      }`}
    >
      <span className={styles.label}>{name}</span>
      <button
        type="button"
        className={styles.showBtn}
        onClick={(e) => handleClick(e)}
      >
        {isShow ? <EyeInvisibleOutlined /> : <EyeOutlined />}
      </button>
      {getInputIcon(name, styles)}
      <input
        type={isShow ? "text" : "password"}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default InputPassword;
