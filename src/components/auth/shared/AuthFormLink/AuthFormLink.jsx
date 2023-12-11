import React from "react";
import { Link } from "react-router-dom";
import styles from "./AuthFormLink.module.scss";

const AuthFormLink = ({ to }) => {
  return (
    <p className={styles.link}>
      {to === "login" ? "Already have an account?" : "Don't have an account?"}
      <Link to={`/${to}`}>
        <span>{to === "login" ? "Sing in" : "Sing up"}</span>
      </Link>
    </p>
  );
};

export default AuthFormLink;
