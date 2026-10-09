import React, { useState } from "react";
import { useCart } from "../../context/cartContext";
import { priceFormatter } from "../../utils/priceFormatter";
import { ReactComponent as CrossIcon } from "../../images/icons/cross.svg";
import PaymentButton from "./PaymentButton";
import styles from "./Cart.module.scss";

const DiscountMessage = () => {
  const [showDiscountMessage, setShowDiscountMessage] = useState(true);

  if (!showDiscountMessage) return null;

  const handleCloseMessage = () => {
    setShowDiscountMessage(false);
  }

  return (
    <div className={styles.discountMessage}>
      <span>Get 10% off when you purchase all courses in any category.</span>
      <button onClick={handleCloseMessage} className={styles.closeButton}>
        <CrossIcon />
      </button>
    </div>
  );
};

const CartPaymentPanel = () => {
  const { getSubtotal, getDiscount, cartQuantity } = useCart();
  const subTotal = getSubtotal();
  const discount = getDiscount();
  const total = subTotal - discount;

  return (
    <div className={styles.paymentPanel}>
      {cartQuantity !== 0 && (
        <>
          {discount !== 0 ? (
            <div className={styles.discount}>
              <div className={styles.subtotalInfoItem}>
                <span>Subtotal:</span>
                <span>{`${priceFormatter(subTotal)} EUR`}</span>
              </div>
              <div className={styles.subtotalInfoItem}>
                <span>Discount:</span>
                <span>{`${priceFormatter(discount)} EUR`}</span>
              </div>
            </div>
          ) : (
            <DiscountMessage />
          )}
          <div className={styles.total}>
            <span>Total:</span>
            <span>{`${priceFormatter(total)} EUR`}</span>
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
