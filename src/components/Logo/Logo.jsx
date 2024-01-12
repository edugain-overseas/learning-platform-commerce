import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../images/logo.svg";
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <Link to="/" className={styles.logoWrapper}>
      <LogoIcon />
    </Link>
  );
};

export default Logo;
