import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as ArrowRightIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as ClockIcon } from "../../../images/icons/clock.svg";
import { ReactComponent as LaptopIcon } from "../../../images/icons/laptop.svg";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
// import RatingStars from "../../shared/RatingStars/RatingStars";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import CardGrade from "../../shared/CardGrade/CardGrade";
import CardPrice from "../../shared/CardPrice/CardPrice";
import styles from "./CourseCard.module.scss";

const CourseCard = ({ course, purchased, disabled }) => {
  const { addItem, removeItem, cartItems } = useCart();
  console.log(disabled);

  const {
    coursePoster,
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
    <li className={`${styles.courseCard} ${disabled ? styles.disabled : ""}`}>
      <Link className={styles.courseLink} to={`/course/${id}/intro`}>
        <div
          className={styles.posterWrapper}
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(${coursePoster})`,
          }}
        >
          <div className={styles.imageWrapper}>
            <img
              src={coursePoster}
              alt={courseName}
              className={styles.coursePoster}
            />
          </div>
        </div>

        <div className={styles.textWrapper}>
          <div className={styles.titleWrapper}>
            <span className={styles.courseName}>
              {courseName}
              <span className={styles.openBtn}>
                <ArrowRightIcon />
              </span>
            </span>
          </div>
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
                <CardGrade grade={0} />
              ) : (
                <CardPrice price={14.99} oldPrice={40} />
              )}
            </div>
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
          <span>{isItemInCart ? "Remove" : "Buy"}</span>
          {isItemInCart ? <TrashIcon /> : <CartIcon />}
        </button>
      )}
    </li>
  );
};

export default CourseCard;
