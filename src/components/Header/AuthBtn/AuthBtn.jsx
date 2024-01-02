import React from "react";
import { NavLink } from "react-router-dom";
import LogOutBtn from "../../auth/LogOutBtn/LogOutBtn";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../../redux/user/selectors";
import { navLinkActiveHandler } from "../../../utils/navLinkActiveHandler";
import styles from "./AuthBtn.module.scss";

const AuthBtn = () => {
  const token = useSelector(getAccessToken);

  return token ? (
    <LogOutBtn />
  ) : (
    <div className={styles.authLinksWrapper}>
      <NavLink
        to="/login"
        className={({ isActive }) => navLinkActiveHandler(isActive, styles)}
      >
        <span>Sing in</span>
      </NavLink>
      <span>|</span>
      <NavLink to="/registration">
        <span>Sing up</span>
      </NavLink>
    </div>
  );
};

export default AuthBtn;
