import React from "react";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import styles from "./CartBtn.module.scss";
import { priceFormatter } from "../../../utils/priceFormatter";

const CartBtn = () => {
  const { handleOpen, totalPrice } = useCart();
  return (
    <button className={styles.cartBtn} onClick={handleOpen}>
      <span>$ {priceFormatter(totalPrice)}</span>
      <CartIcon className={styles.icon} />
    </button>
  );
};

export default CartBtn;
