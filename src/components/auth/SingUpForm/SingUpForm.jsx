import React from "react";
import AuthForm from "../shared/AuthForm/AuthForm";
import styles from "./SingUpForm.module.scss";

const SingUpForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit sing up");
  };

  return (
    <div className={styles.pageWrapper}>
      <AuthForm handleSubmit={handleSubmit} type='registration'/>
    </div>
  );
};

export default SingUpForm;
