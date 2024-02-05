import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../../images/icons/user.svg";
import styles from "./AuthBtn.module.scss";

const AuthBtn = () => {
  return (
    <Link to="/registration" className={styles.link}>
      <span>Sing up</span>
      <UserIcon />
    </Link>
  );
};

export default AuthBtn;
