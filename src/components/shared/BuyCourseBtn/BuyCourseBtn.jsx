import React from "react";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import styles from "./BuyCourseBtn.module.scss";

const BuyCourseBtn = ({ courseId, className = "" }) => {
  const { addItem, handleOpen, cartItems } = useCart();

  const isCourseInCart = cartItems?.find((item) => item.id === courseId);

  if (!courseId) return null;

  return (
    <button
      type="button"
      className={`${styles.buyCourseBtn} ${
        isCourseInCart ? styles.openBtn : ""
      } ${className}`}
      onClick={(e) => {
        e.preventDefault();
        isCourseInCart ? handleOpen() : addItem(courseId);
      }}
    >
      <span>{isCourseInCart ? "Open" : "Buy"}</span>
      <CartIcon />
    </button>
  );
};

export default BuyCourseBtn;
