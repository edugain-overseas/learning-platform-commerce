import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as ArrowRightIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as ClockIcon } from "../../../images/icons/clock.svg";
import { ReactComponent as LaptopIcon } from "../../../images/icons/laptop.svg";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import CardGrade from "../../shared/CardGrade/CardGrade";
import CardPrice from "../../shared/CardPrice/CardPrice";
import { serverName } from "../../../http/sever";
import { getUserType } from "../../../redux/user/selectors";
import styles from "./CourseCard.module.scss";

const CourseCard = ({ course, purchased, disabled }) => {
  const { addItem, removeItem, cartItems } = useCart();
  const isModer = useSelector(getUserType) === "moder";

  const {
    image_path: coursePoster,
    title: courseName,
    c_duration: courseDuration,
    c_type: courseType,
    c_award: courseAward,
    old_price: oldPrice,
    price,
    id,
    progress,
    is_published: isPublished,
    grade
  } = course;

  const isItemInCart = cartItems?.find((item) => item === id) && true;

  const handleAddToCart = (e, id) => {
    e.preventDefault();
    addItem(id);
  };

  const handleRemoveFromCart = (e, id) => {
    e.preventDefault();
    removeItem(id);
  };

  return (
    <li
      className={`${styles.courseCard} ${disabled ? styles.disabled : ""} ${
        !isPublished ? styles.disabled : ""
      }`}
    >
      <Link className={styles.courseLink} to={`/course/${id}/intro`}>
        <div
          className={styles.posterWrapper}
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), url(${
              coursePoster
                ? serverName + "/" + coursePoster
                : "https://online.maryville.edu/wp-content/uploads/sites/97/2023/09/business-management-team.jpg"
            })`,
          }}
        >
          <div className={styles.imageWrapper}>
            <img
              src={
                coursePoster
                  ? `${serverName}/${coursePoster}`
                  : "https://online.maryville.edu/wp-content/uploads/sites/97/2023/09/business-management-team.jpg"
              }
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
            {isModer ? (
              <div>
                <span>{isPublished ? "Published" : "Not published"}</span>
              </div>
            ) : (
              <div className={styles.progressWrapper}>
                <span>Progress:</span>
                <ProgressBar
                  value={purchased ? progress : 0}
                  width={104}
                  height={14}
                  disabled={!purchased}
                />
              </div>
            )}
            <div className={styles.details}>
              <ClockIcon />
              <span>{courseDuration}</span>
            </div>
            <div className={styles.details}>
              <LaptopIcon />
              <span>
                {courseType} | {courseAward}
              </span>
            </div>
            <div className={styles.gradePriceContainer}>
              {purchased ? (
                <CardGrade grade={grade} />
              ) : (
                <CardPrice price={price} oldPrice={oldPrice} />
              )}
            </div>
          </div>
        </div>
      </Link>
      {!purchased && !isModer && (
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
