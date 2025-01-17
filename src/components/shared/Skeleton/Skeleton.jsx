import React from "react";
import styles from "./Skeleton.module.scss";

const Skeleton = ({ style }) => {
  return <div className={styles.sceleton} style={style}></div>;
};

export default Skeleton;
