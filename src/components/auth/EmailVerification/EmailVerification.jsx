import React, { useState } from "react";
import styles from "./EmailVerification.module.scss";
import InputText from "../shared/InputText/InputText";

const EmailVerification = ({
  email = "",
  handleSubmit = () => {},
  handleResendActivationCode = () => {},
}) => {
  const [code, setCode] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (code.length === 7) handleSubmit(code);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h2>Email verification</h2>
        <p className={styles.emailInfo}>
          Let us know that this email address belongs to you. Enter the code
          from the email sent to <span>{email ? email : "your email"}</span>
        </p>
        <div className={styles.row}>
          <InputText name="verificarion code" value={code} onChange={setCode} />
        </div>
        <button type="submit" className={styles.submitBtn}>
          <span>Continue</span>
        </button>
        <p className={styles.sendAgain} onClick={handleResendActivationCode}>
          Send the code <span>again!</span>
        </p>
      </form>
    </div>
  );
};

export default EmailVerification;
