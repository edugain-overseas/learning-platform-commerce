import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../../images/icons/arrow-left.svg";
import { ReactComponent as Like } from "../../images/icons/like.svg";
import styles from "./PaymentPage.module.scss";

const Success = () => {
  return (
    <div className={styles.successWrapper}>
      <div className={styles.topContentWrapper}>
        {/* <img src={SuccessImg} alt="success" /> */}
        <div className={styles.circlesWrapper}>
          <div className={styles.circleOuter}>
            <div className={styles.circleMiddle}>
              <div className={styles.circleInner}></div>
            </div>
          </div>
          <div className={styles.contentInner}></div>
          <div className={styles.like}>
            <Like />
          </div>
        </div>

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
