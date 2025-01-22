import React from "react";
import { useCart } from "../../context/cartContext";
import PaymentButton from "./PaymentButton";
import styles from "./Cart.module.scss";
import { priceFormatter } from "../../utils/priceFormatter";

const CartPaymentPanel = () => {
  const { getSubtotal, getDiscount, cartQuantity } = useCart();
  const subTotal = getSubtotal();
  const discount = getDiscount();
  const total = subTotal - discount;

  return (
    <div className={styles.paymentPanel}>
      {cartQuantity !== 0 && (
        <>
          {discount !== 0 && (
            <div className={styles.discount}>
              <div className={styles.subtotalInfoItem}>
                <span>Subtotal:</span>
                <span>{`${priceFormatter(subTotal)} USD`}</span>
              </div>
              <div className={styles.subtotalInfoItem}>
                <span>Discount:</span>
                <span>{`${priceFormatter(discount)} USD`}</span>
              </div>
            </div>
          )}
          <div className={styles.total}>
            <span>Total:</span>
            <span>{`${priceFormatter(total)} USD`}</span>
          </div>
        </>
      )}
      <div className={styles.btnWrapper}>
        <PaymentButton />
      </div>
    </div>
  );
};

export default CartPaymentPanel;
