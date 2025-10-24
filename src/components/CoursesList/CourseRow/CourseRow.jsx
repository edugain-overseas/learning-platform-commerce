import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as ArrowRightIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as ClockIcon } from "../../../images/icons/clock.svg";
import { ReactComponent as LaptopIcon } from "../../../images/icons/laptop.svg";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import CardGrade from "../../shared/CardGrade/CardGrade";
import CardPrice from "../../shared/CardPrice/CardPrice";
import styles from "./CourseRow.module.scss";

const CourseRow = ({ course, disabled }) => {
  const { addItem, removeItem, cartItems, handleOpen } = useCart();

  const {
    title: courseName,
    c_duration: courseDuration,
    c_type: courseType,
    c_award: courseAward,
    old_price: oldPrice,
    price,
    id,
    progress,
    grade,
    bought,
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
            <ProgressBar value={progress} width={104} height={14} />
          </div>
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
            {bought ? (
              <CardGrade grade={grade} />
            ) : (
              <CardPrice
                price={price}
                oldPrice={oldPrice}
                orientation="horizontal"
                wrapperStyles={{ width: oldPrice && "100%" }}
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
      {!bought && (
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
