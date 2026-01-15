import React from "react";
import { ReactComponent as InfoIcon } from "../../images/icons/info.svg";
import { ReactComponent as CloseIcon } from "../../images/icons/cross.svg";
import styles from "./DiscountPanel.module.scss";
import InsetBtn from "../shared/InsetBtn/InsetBtn";
import { Link } from "react-router-dom";

const DiscountPanel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <InfoIcon />
        <div className={styles.graphicElContainer}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4>
          <strong>Your Discount</strong> Is Guaranteed -{" "}
          <u>Across All Categories</u>
        </h4>
      </div>

      <div className={styles.btnsContainer}>
        <Link>Read More</Link>
        <InsetBtn icon={<CloseIcon className={styles.closeIcon} />} />
      </div>
    </div>
  );
};

export default DiscountPanel;
