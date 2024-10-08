import React from "react";
import { useSelector } from "react-redux";
import { useCart } from "../../context/cartContext";
import { getAllCourses } from "../../redux/course/selectors";
import { ReactComponent as TrashIcon } from "../../images/icons/trashRounded.svg";
import { serverName } from "../../http/server";
import NoImage from "../../images/noImage.jpeg";
import styles from "./Cart.module.scss";

const Cart = ({ items }) => {
  const courses = useSelector(getAllCourses);

  const { removeItem, totalPrice, isLoading, paymentLink } = useCart();

  const products = courses.filter(({ id }) => items.includes(id));

  const handlePaymentBtnClick = () => {
    console.log(paymentLink);
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  };

  console.log(products);

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
          {products.map(
            ({
              id,
              image_path: coursePoster,
              title: courseName,
              price: coursePrice,
            }) => (
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
                    <img
                      src={
                        coursePoster ? `${serverName}/${coursePoster}` : NoImage
                      }
                      alt={courseName}
                    />
                  </div>
                  <div className={styles.productName}>
                    <h4>{courseName}</h4>
                  </div>
                </div>
                <div className={styles.productPrice}>
                  <span>${coursePrice}</span>
                </div>
              </li>
            )
          )}
        </ul>
        <div className={styles.cartFooter}>
          <div className={styles.totalPriceWrapper}>
            <span className={styles.total}>Total</span>
            <span className={styles.totalAmount}>${totalPrice}</span>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <button
              className={styles.paymentBtn}
              onClick={handlePaymentBtnClick}
            >
              Proceed to payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
