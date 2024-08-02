import React from "react";
import { priceFormatter } from "../../../utils/priceFormatter";
import styles from "./CardPrice.module.scss";

const CardPrice = ({
  price = 0,
  oldPrice,
  orientation = "vertical",
  onClick = () => {},
  size = "s",
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${
        orientation === "horizontal" ? styles.horizontal : ""
      }`}
      onClick={handleClick}
      style={{
        transform: `scale(${size === "s" ? 1 : size === "m" ? 1.3 : 1.6})`,
      }}
    >
      {oldPrice ? (
        <div className={styles.oldPriceWrapper}>
          <span className={styles.dollarSign}>$</span>
          <div className={styles.info}>
            <span className={styles.label}>Old price</span>
            <span className={styles.value}>{priceFormatter(oldPrice)}</span>
          </div>
        </div>
      ) : null}
      <div className={styles.priceWrapper}>
        <span className={styles.dollarSign}>$</span>
        <div className={styles.info}>
          <span className={styles.label}>Buy</span>
          <span className={styles.value}>{priceFormatter(price)}</span>
        </div>
      </div>
    </div>
  );
};

export default CardPrice;
