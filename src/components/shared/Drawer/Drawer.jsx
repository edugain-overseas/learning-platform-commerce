import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { useCart } from "../../../context/cartContext";
import { ReactComponent as CrossIcon } from "../../../images/icons/cross.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./Drawer.module.scss";

const orientationClassName = (o) => {
  switch (o) {
    case "left":
      return styles.left;
    case "right":
      return styles.right;
    case "top":
      return styles.top;
    case "bottom":
      return styles.bottom;
    default:
      return styles.left;
  }
};

const Drawer = ({
  children,
  orientation = "left",
  size = "500rem",
  handleClose,
  headerTitle = "",
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.code) {
        case "Escape":
          setIsClosing(true);
          setTimeout(handleClose, 200);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
    // eslint-disable-next-line
  }, []);

  const handleCloseBtnClick = () => {
    setIsClosing(true);
    setTimeout(handleClose, 200);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true);
      setTimeout(handleClose, 200);
    }
  };
  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`${styles.contentWrapper} ${orientationClassName(
          orientation
        )}`}
        style={
          orientation === "left" || orientation === "right"
            ? { width: size, height: "100%" }
            : { width: "100%", height: size }
        }
      >
        <div className={styles.headerWrapper}>
          <span className={styles.title}>{headerTitle}</span>
          <InsetBtn icon={<CrossIcon />} width="32rem" height="32rem" onClick={handleCloseBtnClick} />
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Drawer;
