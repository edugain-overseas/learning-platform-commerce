import React from "react";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import styles from "./BuyCourseBtn.module.scss";

const BuyCourseBtn = ({ courseId, className = "" }) => {
  const { addItem, removeItem, cartItems } = useCart();

  const isCourseInCart = cartItems.find((item) => item.id === courseId);

  if (!courseId) return null;

  return (
    <button
      type="button"
      className={`${styles.buyCourseBtn} ${className}`}
      onClick={() =>
        isCourseInCart ? removeItem(courseId) : addItem(courseId)
      }
    >
      <span>{isCourseInCart ? "Remove" : "Buy"}</span>
      {!isCourseInCart && <CartIcon />}
    </button>
  );
};

export default BuyCourseBtn;
