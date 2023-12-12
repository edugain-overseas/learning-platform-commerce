import React from "react";
import { Link } from "react-router-dom";
import styles from "./AuthFormLink.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";

const AuthFormLink = ({ to }) => {
  return (
    <p className={styles.link}>
      {to === "login" ? "Already have an account?" : "Don't have an account?"}
      <Link to={`/${to}`}>
        <span className={styles.linkText}>{to === "login" ? "Sing in" : "Sing up"}</span>
        <ArrowRightOutlined />
      </Link>
    </p>
  );
};

export default AuthFormLink;
