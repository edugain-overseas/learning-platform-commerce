import React, { useState } from "react";
import InputText from "../InputText/InputText";
import AuthFormLink from "../AuthFormLink/AuthFormLink";
import InputPassword from "../InputPassword/InputPassword";
import {
  validateEmail,
  validatePassword,
  validateText,
} from "../../../../utils/inputsValidateHandler";
import { message } from "antd";
import { ReactComponent as GoogleIcon } from "../../../../images/icons/google.svg";
import styles from "./AuthForm.module.scss";

const AuthForm = ({ handleSubmit, type }) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const isFormValid = (data) => {
    return Object.keys(data).reduce((isValid, key) => {
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
      return true;
    }, true);
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

    if (isFormValid(data)) handleSubmit(data)
  };

  const handleCustomGoogleButtonClick = () => {
    try {
      /* global google */
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
          google.accounts.id.prompt();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      {contextHolder}
      <h2>{type === "registration" ? "Sing up" : "Sing in"}</h2>
      <AuthFormLink to={type === "registration" ? "login" : "registration"} />
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
      <div className={styles.lastRow}>
        <InputPassword
          name="password"
          value={password}
          onChange={setPassword}
        />
      </div>
      <div className={styles.btnsWrapper}>
        <button className={styles.submitBtn}>
          <span>{type === "registration" ? "Sing up" : "Sing in"}</span>
        </button>
        <span className={styles.divider}>or continue with</span>
        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleCustomGoogleButtonClick}
        >
          <GoogleIcon />
          <span>Account Google</span>
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
