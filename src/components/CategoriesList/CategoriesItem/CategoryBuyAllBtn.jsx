import React from "react";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as BuyIcon } from "../../../images/icons/cart.svg";
import styles from "./CategoriesItem.module.scss";

const CategoryBuyAllBtn = ({ categoryId, disabled }) => {
  const { addAllCoursesInCategory } = useCart();
  return (
    <button
      className={`${styles.studentBtn} ${styles.buyAll}`}
      onClick={() => addAllCoursesInCategory(categoryId)}
      disabled={disabled}
    >
      <span>Buy all</span>
      <BuyIcon />
    </button>
  );
};

export default CategoryBuyAllBtn;
