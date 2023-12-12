import React from "react";
import AuthForm from "../shared/AuthForm/AuthForm";
import styles from './SingInForm.module.scss'

const SingInForm = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className={styles.pageWrapper}>
      <AuthForm handleSubmit={handleSubmit} type='login'/>
    </div>
  );
};

export default SingInForm;
