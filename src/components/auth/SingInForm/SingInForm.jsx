import React from "react";
import AuthForm from "../shared/AuthForm/AuthForm";
import styles from './SingInForm.module.scss'

const SingInForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit sing in");
  };
  return (
    <div className={styles.pageWrapper}>
      <AuthForm handleSubmit={handleSubmit} type='login'/>
    </div>
  );
};

export default SingInForm;
