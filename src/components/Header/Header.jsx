import React from "react";
import PrevLink from "./PrevLink/PrevLink";
import CurrentTime from "./CurrentTime/CurrentTime";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <PrevLink />
      <CurrentTime />
    </header>
  );
};

export default Header;
