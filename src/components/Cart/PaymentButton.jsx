import React from "react";
import { useCart } from "../../context/cartContext";
import { ReactComponent as CartIcon } from "../../images/icons/cart.svg";
import styles from "./Cart.module.scss";

const PaymentButton = () => {
  const { cartQuantity, handleClose } = useCart();

  const handlePay = () => {};

  return (
    <button
      className={styles.paymentBtn}
      onClick={cartQuantity === 0 ? handleClose : handlePay}
    >
      <span>{cartQuantity === 0 ? "Continue shopping" : "Checkout"}</span>
      <CartIcon />
    </button>
  );
};

export default PaymentButton;
