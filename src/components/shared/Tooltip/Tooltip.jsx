import React, { useState } from "react";
import styles from "./Tooltip.module.scss";

const Tooltip = ({
  children,
  orientation = "left",
  infoContent = "Hello world",
  popupMaxWidth = "204rem",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper} onMouseLeave={() => setIsOpen(false)}>
      <div onMouseEnter={() => setIsOpen(true)}>{children}</div>
      <div
        className={`${styles.popup} ${styles[orientation]}`}
        style={{
          opacity: isOpen ? 1 : 0,
          maxWidth: popupMaxWidth,
          pointerEvents: "none",
        }}
      >
        <p>{infoContent}</p>
      </div>
    </div>
  );
};

export default Tooltip;
