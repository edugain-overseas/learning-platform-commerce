import React, { useState } from "react";
import InputText from "../InputText/InputText";
import AuthFormLink from "../AuthFormLink/AuthFormLink";
import styles from "./AuthForm.module.scss";

const AuthForm = ({ handleSubmit, type }) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className={styles.form}>
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
        <InputText name="password" value={password} onChange={setPassword} />
      </div>
      <div className={styles.row}>
        <button className={styles.submitBtn} onClick={handleSubmit}>
          <span>{type === "registration" ? "Sing up" : "Sing in"}</span>
        </button>
      </div>
      <AuthFormLink to={type === "registration" ? "login" : "registration"} />
    </form>
  );
};

export default AuthForm;
