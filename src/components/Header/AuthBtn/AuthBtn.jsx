import React from "react";
import { Link } from "react-router-dom";
import LogOutBtn from "../../auth/LogOutBtn/LogOutBtn";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../../redux/user/selectors";
import styles from './AuthBtn.module.scss'

const AuthBtn = () => {
  const token = useSelector(getAccessToken);

  return token ? (
    <LogOutBtn />
  ) : (
    <div className={styles.authLinksWrapper}>
      <Link to="/login">
        <span>Sing in</span>
      </Link>
      <span>|</span>
      <Link to="/registration">
        <span>Sing up</span>
      </Link>
    </div>
  );
};

export default AuthBtn;
