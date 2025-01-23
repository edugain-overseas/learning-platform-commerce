import React from "react";
import { ReactComponent as WarningIcon } from "../../images/icons/warning.svg";
import HeroAuthBtns from "../../pages/HomePage/HomeHero/HomeAuthBtns";
import styles from "./ProfileAuthPanel.module.scss";

const ProfileAuthPanel = () => {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.topWrapper}>
        <div className={styles.iconWrapper}>
          <WarningIcon />
        </div>
        <p>Available to registered users, please log in.</p>
      </div>
      <HeroAuthBtns />
    </div>
  );
};

export default ProfileAuthPanel;
