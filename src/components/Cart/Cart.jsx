import React from "react";
import { courses } from "../../assets/courses";
import { ReactComponent as TrashIcon } from "../../images/icons/trashRounded.svg";
import styles from "./Cart.module.scss";
import { useCart } from "../../context/cartContext";

const Cart = ({ items }) => {
  const { removeItem, totalPrice } = useCart();

  const products = courses.filter(({ id }) => items.includes(id));

  // const totalPrice = products.reduce(
  //   (total, { coursePrice }) => total + coursePrice,
  //   0
  // );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Your cart</h3>
      </div>
      <div className={styles.body}>
        <div className={styles.cartHeader}>
          <span className={styles.product}>Product</span>
          <span className={styles.price}>Price</span>
        </div>
        <ul className={styles.cartItems}>
          {products.map(({ id, coursePoster, courseName, coursePrice }) => (
            <li key={id}>
              <div className={styles.productInfoWrapper}>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(id)}
                >
                  <span>
                    <TrashIcon />
                  </span>
                </button>
                <div className={styles.productImage}>
                  <img src={coursePoster} alt={courseName} />
                </div>
                <div className={styles.productName}>
                  <h4>{courseName}</h4>
                </div>
              </div>
              <div className={styles.productPrice}>
                <span>${coursePrice}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.cartFooter}>
          <span className={styles.total}>Total</span>
          <span className={styles.totalAmount}>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
