import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as CrossIcon } from "../../../images/icons/cross.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./Modal.module.scss";

const Modal = ({
  children,
  width = "610rem",
  isOpen = false,
  closeModal = () => {},
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={styles.contentWrapper} style={{ width }}>
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
