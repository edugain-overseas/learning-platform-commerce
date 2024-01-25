import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as ArrowRightIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as ClockIcon } from "../../../images/icons/clock.svg";
import { ReactComponent as LaptopIcon } from "../../../images/icons/laptop.svg";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import ProgressBar from "../../auth/shared/ProgressBar/ProgressBar";
import CardGrade from "../../auth/shared/CardGrade/CardGrade";
import CardPrice from "../../auth/shared/CardPrice/CardPrice";
import styles from "./CourseRow.module.scss";

const CourseRow = ({ course, purchased, disabled }) => {
  const { addItem, removeItem, cartItems, handleOpen } = useCart();

  const {
    // coursePoster,
    courseName,
    // courseStars,
    // coursePrice,
    // courseIncludes,
    // courseDuration,
    id,
  } = course;

  const isItemInCart = cartItems.find((item) => item === id) && true;

  const handleAddToCart = (e, id) => {
    e.preventDefault();
    addItem(id);
  };

  const handleRemoveFromCart = (e, id) => {
    e.preventDefault();
    removeItem(id);
  };
  return (
    <li className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      <Link className={styles.courseLink} to={`/course/${id}/intro`}>
        <h3 className={styles.title}>
          {courseName}
          <span className={styles.openBtn}>
            <ArrowRightIcon />
          </span>
        </h3>
        <div className={styles.courseInfo}>
          <div className={styles.progressWrapper}>
            <span>Progress:</span>
            <ProgressBar
              value={purchased ? 34 : 0}
              width={104}
              height={14}
              disabled={!purchased}
            />
          </div>
          <div className={styles.details}>
            <ClockIcon />
            <span>3 hours {"(self-paced)"}</span>
          </div>
          <div className={styles.details}>
            <LaptopIcon />
            <span>Online course | Certificate</span>
          </div>
          <div className={styles.gradePriceContainer}>
            {purchased ? (
              <CardGrade grade={192} />
            ) : (
              <CardPrice
                price={14.99}
                oldPrice={40}
                orientation="horizontal"
                onClick={
                  !isItemInCart
                    ? () => {
                        addItem(id);
                        handleOpen();
                      }
                    : null
                }
              />
            )}
          </div>
        </div>
      </Link>
      {!purchased && (
        <button
          className={styles.cardBtn}
          onClick={(e) =>
            isItemInCart ? handleRemoveFromCart(e, id) : handleAddToCart(e, id)
          }
        >
          {isItemInCart ? <TrashIcon /> : <CartIcon />}
        </button>
      )}
    </li>
  );
};

export default CourseRow;
