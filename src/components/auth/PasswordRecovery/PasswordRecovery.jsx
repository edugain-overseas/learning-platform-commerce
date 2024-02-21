import React, { useState } from "react";
import { validateCode, validateEmail } from "../../../utils/inputsValidateHandler";
import InputText from "../shared/InputText/InputText";
import styles from "./PasswordRecovery.module.scss";
import { resetPassword } from "../../../http/services/user";
import InputPassword from "../shared/InputPassword/InputPassword";

const PasswordRecovery = ({ messageApi }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [errorField, setErrorField] = useState("");
  const [isVerification, setIsVerification] = useState(false);

  const handleSumbitEmail = async (e) => {
    e.preventDefault();

    //client validation
    if (!validateEmail(email)) {
      messageApi.open({
        type: "error",
        content: (
          <>
            <span>Please write valid email.</span>
            <p>Example: example@mail.com</p>
          </>
        ),
      });
      setErrorField("email");
      return;
    }

    try {
      const response = await resetPassword(email);
      const message = response.data.message;
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: `${message} ${email}`,
        });
        setIsVerification(true);
      }
    } catch (error) {
      //response validation
      const message = error.response.data.detail;
      if (error.response.status === 404 && message.includes("email")) {
        messageApi.open({
          type: "error",
          content: message,
        });
        setErrorField("email");
      } else {
        messageApi.open({
          type: "error",
          content: "Something went wrong. Please try again",
        });
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    //client validation
    if (!validateCode(code)) {
      messageApi.open({
        type: "error",
        content: (
          <>
            <span>Please write valid email.</span>
            <p>Example: example@mail.com</p>
          </>
        ),
      });
      setErrorField("email");
      return;
    }
  };

  const resetError = () => {
    setErrorField("");
  };

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={isVerification ? handleVerify : handleSumbitEmail}
      >
        <h2>Password recovery</h2>
        <p className={styles.emailInfo}>
          {isVerification
            ? "Enter the received code to your email and enter a new password."
            : "Enter the email that was used for registration. We will send you a recovery code."}
        </p>
        {isVerification ? (
          <>
            <div className={styles.row}>
              <InputText
                name="Recovery code"
                value={code}
                onChange={setCode}
                isError={errorField === "code"}
                resetError={resetError}
              />
            </div>
            <div className={styles.row}>
              <InputPassword
                name="New password"
                value={newPassword}
                onChange={setNewPassword}
                isError={errorField === "newPassword"}
                resetError={resetError}
              />
            </div>
          </>
        ) : (
          <div className={styles.row}>
            <InputText
              name="email"
              value={email}
              onChange={setEmail}
              isError={errorField === "email"}
              resetError={resetError}
            />
          </div>
        )}
        <button type="submit" className={styles.submitBtn}>
          <span>Continue</span>
        </button>
        {isVerification && (
          <p className={styles.sendAgain}>
            Send the code <span>again!</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default PasswordRecovery;
