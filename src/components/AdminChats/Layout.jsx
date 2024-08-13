import React from "react";
import styles from './AdminChatsComponent.module.scss'

const Layout = ({ children, className }) => {
  return (
    <div className={`${styles.layout} ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default Layout;
