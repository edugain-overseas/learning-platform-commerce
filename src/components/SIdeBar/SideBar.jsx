import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
// import LogoutButton from "./LogoutButton/LogoutButton";
import { ReactComponent as FixIcon } from "../../images/icons/fix.svg";
import styles from "./SideBar.module.scss";

const SideBar = () => {
  const [isExpandedFixed, setIsExpandedFixed] = useState(false);
  const [isNarrowedFixed, setIsNarrowedFixed] = useState(false);

  const handleNarrowedFix = () => {
    setIsNarrowedFixed((prev) => {
      if (isExpandedFixed) {
        setIsExpandedFixed(false);
      }
      return !prev;
    });
  };

  const handleExpandedFixed = () => {
    setIsExpandedFixed((prev) => {
      if (isNarrowedFixed) {
        setIsNarrowedFixed(false);
      }
      return !prev;
    });
  };

  return (
    <div
      className={`${styles.wrapper} 
      ${isExpandedFixed ? styles.expandedFixed : ""} 
      ${isNarrowedFixed ? styles.narrowedFixed : ""}`}
    >
      <div className={styles.narrowed}>
        <button className={styles.fixBtn} onClick={handleNarrowedFix}>
          <FixIcon />
        </button>
        <p className={styles.officialLabel}>Official Platform</p>
        <NavBar />
      </div>
      <div className={styles.expanded}>
        <button className={styles.fixBtn} onClick={handleExpandedFixed}>
          <FixIcon />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
