import React from "react";
import { ReactComponent as UserIcon } from "../../../images/icons/user.svg";
import styles from "./AvatarFallback.module.scss";

const AvatarFallback = (size) => {
  return (
    <div className={styles.wrapper} style={{ width: size, height: size }}>
      <UserIcon />
    </div>
  );
};

export default AvatarFallback;
