import React from "react";
import PrevLink from "./PrevLink/PrevLink";
import CurrentTime from "./CurrentTime/CurrentTime";
import styles from "./Header.module.scss";
import AuthBtn from "./AuthBtn/AuthBtn";

const Header = () => {
  return (
    <header className={styles.header}>
      <PrevLink />
      <CurrentTime />
      <AuthBtn />
    </header>
  );
};

export default Header;
