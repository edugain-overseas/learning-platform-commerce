import React from "react";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import styles from "./BuyCourseBtn.module.scss";

const BuyCourseBtn = ({ courseId, className = "" }) => {
  const { addItem, removeItem, cartItems } = useCart();

  const isCourseInCart = cartItems?.find((item) => item.id === courseId);

  if (!courseId) return null;

  return (
    <button
      type="button"
      className={`${styles.buyCourseBtn} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        isCourseInCart ? removeItem(courseId) : addItem(courseId);
      }}
    >
      <span>{isCourseInCart ? "Remove" : "Buy"}</span>
      {isCourseInCart ? <TrashIcon /> : <CartIcon />}
    </button>
  );
};

export default BuyCourseBtn;
