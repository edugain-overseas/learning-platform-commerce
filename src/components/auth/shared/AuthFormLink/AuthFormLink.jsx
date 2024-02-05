import React from "react";
import { Link } from "react-router-dom";
// import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./AuthFormLink.module.scss";

const AuthFormLink = ({ to }) => {
  return (
    <p className={styles.link}>
      {to === "login"
        ? "If you already have an account, "
        : "If you don't have an account yet, "}
      <Link to={`/${to}`}>
        <span className={styles.linkText}>
          {to === "login" ? "log in here!" : "sign up here!"}
        </span>
        {/* <ArrowRightOutlined /> */}
      </Link>
    </p>
  );
};

export default AuthFormLink;
