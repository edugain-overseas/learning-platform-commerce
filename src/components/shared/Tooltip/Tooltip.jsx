import React, { useEffect, useRef, useState } from "react";
import styles from "./Tooltip.module.scss";

const Tooltip = ({
  children,
  orientation = "left",
  infoContent = "Hello world",
  popupMaxWidth = "204rem",
  trigger = "hover",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const childrenWrapperRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const childrenWrapper = childrenWrapperRef.current;
    const children = childrenWrapper.firstChild;

    if (trigger === "focus") {
      children.addEventListener("focus", handleOpen);
      children.addEventListener("blur", handleClose);
    }

    return () => {
      if (trigger === "focus") {
        children.removeEventListener("focus", handleOpen);
        children.removeEventListener("blur", handleClose);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={styles.wrapper}
      onMouseLeave={trigger === "hover" ? () => setIsOpen(false) : () => {}}
    >
      <div
        ref={childrenWrapperRef}
        onMouseEnter={trigger === "hover" ? () => setIsOpen(true) : () => {}}
      >
        {children}
      </div>
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
