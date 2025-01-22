import React from "react";
import styles from "./Cart.module.scss";
import CartItem from "./CartItem";
import CartPaymentPanel from "./CartPaymentPanel";

const Cart = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.cartItems}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <CartPaymentPanel />
    </div>
  );
};

export default Cart;
