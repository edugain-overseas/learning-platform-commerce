import React, { useState } from "react";
import { ReactComponent as InfoIcon } from "../../../images/icons/info.svg";
import styles from "./InfoBtn.module.scss";

const InfoBtn = ({
  infoContent = "Hello world",
  orientation = "left",
  wrapperStyles = {},
  popupMaxWidth = "204rem",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.wrapper} style={wrapperStyles}>
      <button
        className={styles.infoBtn}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div>
          <InfoIcon />
        </div>
      </button>
      <div
        className={`${styles.popup} ${styles[orientation]}`}
        style={{ opacity: isOpen ? 1 : 0, maxWidth: popupMaxWidth }}
      >
        <p>{infoContent}</p>
      </div>
    </div>
  );
};

export default InfoBtn;
