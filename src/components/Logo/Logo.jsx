import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo_feu.webp";
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <Link to="/" className={styles.logoWrapper}>
      <img src={logo} alt="FEU logo" width={121}/>
    </Link>
  );
};

export default Logo;
