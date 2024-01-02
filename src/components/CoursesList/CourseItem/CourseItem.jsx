import React from "react";
import { Link } from "react-router-dom";
import styles from "./CourseItem.module.scss";
import RatingStars from "../../shared/RatingStars/RatingStars";
import { useCart } from "../../../context/cartContext";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const CourseItem = ({ course }) => {
  const { addItem, removeItem, cartItems } = useCart();

  const {
    coursePoster,
    courseName,
    courseStars,
    coursePrice,
    courseIncludes,
    courseDuration,
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
    <li className={styles.courseCard}>
      <Link className={styles.courseLink} to={`/courses/${id}`}>
        <img
          src={coursePoster}
          alt={courseName}
          className={styles.coursePoster}
        />
        <div className={styles.textWrapper}>
          <h3 className={styles.courseName}>{courseName}</h3>
          <div className={styles.courseStarsWrapper}>
            <span>{courseStars}</span>
            <RatingStars rating={courseStars} width="24rem" />
          </div>
          <div className={styles.courseInfo}>
            <div className={styles.about}>
              <p>{courseIncludes.join(" + ")}</p>
              <p>{courseDuration} hours / self-paced</p>
            </div>
            <div className={styles.price}>
              <span>
                {"$"} {coursePrice}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`${styles.btnsWrapper} ${
            isItemInCart ? styles.inCart : ""
          }`}
        >
          <button
            className={styles.addBtn}
            onClick={(e) => handleAddToCart(e, id)}
          >
            <ShoppingCartOutlined className={styles.icon} />
            <span>Add to cart</span>
          </button>
          <button
            className={styles.removeBtn}
            onClick={(e) => handleRemoveFromCart(e, id)}
          >
            <DeleteOutlined className={styles.icon} />
            <span>Remove from cart</span>
          </button>
        </div>
      </Link>
    </li>
  );
};

export default CourseItem;
