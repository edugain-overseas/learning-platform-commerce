import React from "react";
import { ReactComponent as SupportIcon } from "../../../images/icons/support.svg";
import styles from "./SupportBtn.module.scss";
import { useChats } from "../../../context/chatContext";

const SupportBtn = () => {
  const { handleOpen } = useChats();
  return (
    <div className={styles.wrapper}>
      <div className={styles.narrowed}>
        <button type="button" onClick={handleOpen}>
          <SupportIcon />
        </button>
      </div>
      <div className={styles.expanded} id="expanded">
        <span onClick={handleOpen}>Manager's support</span>
      </div>
    </div>
  );
};

export default SupportBtn;
