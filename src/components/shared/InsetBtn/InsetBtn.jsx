import React from "react";
import styles from "./InsetBtn.module.scss";

const InsetBtn = ({
  icon,
  width = "24rem",
  height = "24rem",
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <button
      style={{ "--button-width": width, "--button-height": height }}
      className={styles.insetBtn}
      onClick={onClick}
      disabled={disabled}
    >
      <div>{icon}</div>
    </button>
  );
};

export default InsetBtn;
