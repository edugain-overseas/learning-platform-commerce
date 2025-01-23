import React from "react";
import { Link } from "react-router-dom";
import SuccessImg from "../../images/Success.webp";
import { ReactComponent as Arrow } from "../../images/icons/arrow-left.svg";
import styles from "./PaymentPage.module.scss";

const Success = () => {
  return (
    <div className={styles.successWrapper}>
      <div className={styles.topContentWrapper}>
        <img src={SuccessImg} alt="success"/>
        <p>Your purchase</p>
        <p>Was successful!</p>
      </div>
      <Link className={styles.link} to="/courses/my">
        <span>Go to the purchased course</span>
        <Arrow />
      </Link>
    </div>
  );
};

export default Success;
