import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { EyeOutlined } from "@ant-design/icons";
import { ReactComponent as CrossIcon } from "../../../images/icons/cross.svg";
import styles from "./ImageWithPreview.module.scss";

const Modal = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.code) {
        case "Escape":
          handleClose();
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

  const handleClose = (e) => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      onClose(e);
    }, 200);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`${isClosing ? styles.closing : ""} ${styles.overlay}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>{children}</div>
      <button className={styles.closeBtn} onClick={handleClose}>
        <CrossIcon />
      </button>
    </div>,
    document.body
  );
};

const ImageWithPreview = ({ src, alt, width, height, buttonContent }) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const handleClose = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setOpenModal(false);
  };
  return (
    <div
      className={styles.imageWrapper}
      style={{ width: width || "100%", height: height || "auto" }}
      onClick={() => setOpenModal(true)}
    >
      <img src={src} alt={alt} />
      <div className={styles.hoverBackdrop}>
        {buttonContent ? (
          buttonContent
        ) : (
          <EyeOutlined
            style={{ width: `${width ? `${width * 0.2}rem` : "32px"}` }}
          />
        )}
      </div>
      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={handleClose}>
          <img src={src} alt={alt} />
        </Modal>
      )}
    </div>
  );
};

export default ImageWithPreview;
