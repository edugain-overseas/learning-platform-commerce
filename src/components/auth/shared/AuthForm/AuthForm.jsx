import React, { useState } from "react";
import InputText from "../InputText/InputText";
import AuthFormLink from "../AuthFormLink/AuthFormLink";
import styles from "./AuthForm.module.scss";
import InputPassword from "../InputPassword/InputPassword";
import {
  validateEmail,
  validatePassword,
  validateText,
} from "../../../../utils/inputsValidateHandler";
import { message } from "antd";

const AuthForm = ({ handleSubmit, type }) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const isFormValid = (data) => {
    Object.keys(data).forEach((key) => {
      if (!validateText(data[key])) {
        messageApi.open({
          type: "error",
          content: `Please fill ${key} field`,
        });
        return false;
      }
      if (key === "email" && !validateEmail(data[key])) {
        messageApi.open({
          type: "error",
          content: (
            <>
              <span>Please write valid email.</span>
              <p>Example: example@mail.com</p>
            </>
          ),
        });
        return false;
      }
      if (key === "password" && !validatePassword(data[key])) {
        messageApi.open({
          type: "error",
          content: `Your ${key} must be at least 8 characters long`,
        });
        return false;
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      firstname,
      lastname,
      email,
      password,
    };

    if (isFormValid(data)) {
      return;
    }

    handleSubmit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      {contextHolder}
      <h2>{type === "registration" ? "Sing up" : "Sing in"}</h2>
      <div className={styles.row}>
        <InputText name="username" value={username} onChange={setUsername} />
      </div>
      {type === "registration" && (
        <>
          <div className={styles.row}>
            <InputText
              name="first name"
              value={firstname}
              onChange={setFirstname}
            />
          </div>
          <div className={styles.row}>
            <InputText
              name="last name"
              value={lastname}
              onChange={setLastname}
            />
          </div>

          <div className={styles.row}>
            <InputText name="email" value={email} onChange={setEmail} />
          </div>
        </>
      )}
      <div className={styles.row}>
        <InputPassword
          name="password"
          value={password}
          onChange={setPassword}
        />
      </div>
      <div className={styles.row}>
        <button className={styles.submitBtn}>
          <span>{type === "registration" ? "Sing up" : "Sing in"}</span>
        </button>
      </div>
      <AuthFormLink to={type === "registration" ? "login" : "registration"} />
    </form>
  );
};

export default AuthForm;
