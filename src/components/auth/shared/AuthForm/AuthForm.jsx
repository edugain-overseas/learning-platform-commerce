import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateText,
} from "../../../../utils/inputsValidateHandler";
import InputText from "../InputText/InputText";
import AuthFormLink from "../AuthFormLink/AuthFormLink";
import InputPassword from "../InputPassword/InputPassword";
import styles from "./AuthForm.module.scss";
import ServicesBtns from "./ServicesBtns";

const AuthForm = ({
  handleSubmit,
  type,
  errorField,
  resetError,
  setIsResetPassword = () => {},
  messageApi,
}) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const query = useLocation().search;
  const usernameFromQueryParams = new URLSearchParams(query).get("username");
  console.log(usernameFromQueryParams);

  const isFormValid = (data) => {
    const valid = Object.keys(data).reduce((acc, key) => {
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
        return acc && false;
      }
      if (key === "password" && !validatePassword(data[key])) {
        messageApi.open({
          type: "error",
          content: `Your ${key} must be at least 8 characters long`,
        });
        return acc && false;
      }
      if (!validateText(data[key])) {
        messageApi.open({
          type: "error",
          content: `Please fill ${key} field`,
        });
        return acc && false;
      }
      return acc && true;
    }, true);
    return valid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameFromQueryParams ? usernameFromQueryParams : username,
      firstname,
      lastname,
      email,
      password,
    };

    const loginData = new FormData();
    loginData.append(
      "username",
      usernameFromQueryParams ? usernameFromQueryParams : username
    );
    loginData.append("password", password);

    switch (type) {
      case "registration":
        if (
          isFormValid({
            username: data.username,
            email: data.email,
            password: data.password,
          })
        )
          handleSubmit(data);
        break;
      case "login":
        if (
          isFormValid({
            username: data.username,
            password: data.password,
          })
        )
          handleSubmit(loginData);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h2>{type === "registration" ? "Sing up" : "Sing in"}</h2>
        <AuthFormLink to={type === "registration" ? "login" : "registration"} />
        <div className={styles.row}>
          <InputText
            name="Username"
            value={usernameFromQueryParams ? usernameFromQueryParams : username}
            onChange={setUsername}
            isError={errorField === "username"}
            resetError={resetError}
            disabled={usernameFromQueryParams}
          />
        </div>
        {type === "registration" && (
          <>
            <div className={styles.row}>
              <InputText
                name="First name"
                value={firstname}
                onChange={setFirstname}
              />
            </div>
            <div className={styles.row}>
              <InputText
                name="Last name"
                value={lastname}
                onChange={setLastname}
              />
            </div>

            <div className={styles.row}>
              <InputText
                name="Email"
                value={email}
                onChange={setEmail}
                isError={errorField === "email"}
                resetError={resetError}
              />
            </div>
          </>
        )}
        <div className={styles.lastRow}>
          <InputPassword
            name="Password"
            value={password}
            onChange={setPassword}
            isError={errorField === "password"}
            resetError={resetError}
          />
        </div>
        <div className={styles.btnsWrapper}>
          <button className={styles.submitBtn}>
            <span>{type === "registration" ? "Sing up" : "Sing in"}</span>
          </button>
          {type === "login" && errorField === "password" && (
            <button
              type="button"
              className={styles.passwordRecoveryBtn}
              onClick={() => setIsResetPassword(true)}
            >
              <span>Forgot your password?</span>
            </button>
          )}
          <ServicesBtns />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
