import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactComponent as CrossIcon } from "../../../images/icons/cross.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./Modal.module.scss";

const Modal = ({
  children,
  width = "610rem",
  height = "auto",
  contentWrapperStyles = {},
  isOpen = false,
  closeModal = () => {},
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeydown = (e) => {
    const { code } = e;
    if (code === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeydown);
    }

    return () => window.removeEventListener("keydown", handleKeydown);
    // eslint-disable-next-line
  }, [isOpen]);

  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        className={styles.contentWrapper}
        style={{ width, height, ...contentWrapperStyles }}
      >
        {children}
        <div className={styles.closeBtn}>
          <InsetBtn icon={<CrossIcon />} onClick={closeModal} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
