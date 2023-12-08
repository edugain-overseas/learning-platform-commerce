import React from "react";
import { ReactComponent as LogoutIcon } from "../../../images/icons/logout.svg";
import styles from "./LogoutButton.module.scss";

const LogoutButton = () => {

  return (
    <button
      className={styles.LogoutButton}
      type="button"
    >
      <LogoutIcon />
      <span>Log out</span>
    </button>
  );
};

export default LogoutButton
