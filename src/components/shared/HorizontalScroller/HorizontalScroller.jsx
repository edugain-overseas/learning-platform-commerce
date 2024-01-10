import React from "react";
import styles from "./HorizontalScroller.module.scss";

const HorizontalScroller = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default HorizontalScroller;
