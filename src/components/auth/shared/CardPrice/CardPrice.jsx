import React from "react";
import styles from "./CardPrice.module.scss";

const CardPrice = ({ price, oldPrice, orientation = "vertical" }) => {
  return (
    <div
      className={`${styles.wrapper} ${
        orientation === "horizontal" ? styles.horizontal : ""
      }`}
    >
      {oldPrice && (
        <div className={styles.oldPriceWrapper}>
          <span className={styles.dollarSign}>$</span>
          <div className={styles.info}>
            <span className={styles.label}>Old price</span>
            <span className={styles.value}>{oldPrice}</span>
          </div>
        </div>
      )}
      <div className={styles.priceWrapper}>
        <span className={styles.dollarSign}>$</span>
        <div className={styles.info}>
          <span className={styles.label}>Buy</span>
          <span className={styles.value}>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default CardPrice;
