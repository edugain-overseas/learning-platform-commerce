import React from "react";
import CancelImg from "../../images/Cancel.webp";
import { ReactComponent as ReloadIcon } from "../../images/icons/reload.svg";
import styles from "./PaymentPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";

const Cancel = () => {
  const navigate = useNavigate();
  const { handleOpen } = useCart();

  const handleTryAgain = () => {
    navigate("/", { replace: true });
    handleOpen();
  };

  return (
    <div className={styles.cancelWrapper}>
      <div className={styles.topContentWrapper}>
        <img src={CancelImg} alt="cancel" />
        <p>Sorry</p>
        <p>something went wrong</p>
      </div>
      <button className={styles.tryAgainBtn} onClick={handleTryAgain}>
        <span>Try again</span>
        <ReloadIcon />
      </button>
    </div>
  );
};

export default Cancel;
