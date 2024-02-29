import React, { useState } from "react";
// import { courses } from "../../assets/courses";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../../context/cartContext";
import { getAllCourses } from "../../redux/course/selectors";
import { ReactComponent as TrashIcon } from "../../images/icons/trashRounded.svg";
import styles from "./Cart.module.scss";
import { serverName } from "../../http/sever";
import { getAccessToken } from "../../redux/user/selectors";
import { useLocation, useNavigate } from "react-router-dom";
import { buyCourseThunk } from "../../redux/user/operations";

const Cart = ({ items, handleClose = () => {} }) => {
  const { removeItem, totalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const accessToken = useSelector(getAccessToken);
  const courses = useSelector(getAllCourses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const products = courses.filter(({ id }) => items.includes(id));

  const handlePaymentBtnClick = async () => {
    if (accessToken) {
      setIsLoading(true);
      await Promise.all(
        items.map((id) =>
          dispatch(buyCourseThunk({ courseId: id, removeItem }))
        )
      ).then((r) => {
        handleClose();

        console.log(r);
      });
      setIsLoading(false);
    } else {
      handleClose();
      navigate("/login", {
        state: {
          from: pathname,
          navigateFromCart: true,
        },
      });
    }
  };

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
                        coursePoster
                          ? `${serverName}/${coursePoster}`
                          : "https://online.maryville.edu/wp-content/uploads/sites/97/2023/09/business-management-team.jpg"
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
