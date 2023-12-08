import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import NotificationBar from "./NotificationBar/NotificationBar";
import LogoutButton from "./LogoutButton/LogoutButton";
import styles from "./SideBar.module.scss";

const SideBar = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.logo}>
        logo
      </Link>
      <NavBar />
      <NotificationBar />
      <LogoutButton />
    </div>
  );
};

export default SideBar;
