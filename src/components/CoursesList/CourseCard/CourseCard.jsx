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
import { serverName } from "../../../http/server";
import { getUserType } from "../../../redux/user/selectors";
import ImageWithSkeleton from "../../shared/Skeletons/ImageWithSkeleton";
import WrapperWithDynamicBgImage from "../../shared/Skeletons/WrapperWithDynamicBgImage";
import styles from "./CourseCard.module.scss";

const CourseCard = ({
  course,
  purchased,
  disabled,
  containerClassname = "",
  renderBuyBtn = true,
}) => {
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
    grade,
    bought,
  } = course;

  const isItemInCart = cartItems?.find((item) => item.id === id);

  const handleAddToCart = (e, id) => {
    e.preventDefault();
    addItem(id);
  };

  const handleRemoveFromCart = (e, id) => {
    e.preventDefault();
    removeItem(id);
  };

  const courseLink = `/course/${id}/` + (bought ? "tasks" : "intro");

  return (
    <li
      className={`${styles.courseCard} ${containerClassname} ${
        disabled ? styles.disabled : ""
      } ${!isPublished ? styles.disabled : ""}`}
    >
      <Link className={styles.courseLink} to={courseLink}>
        <WrapperWithDynamicBgImage
          className={styles.posterWrapper}
          url={encodeURI(`${serverName}/${coursePoster}`)}
        >
          <ImageWithSkeleton
            src={`${serverName}/${coursePoster}`}
            alt={courseName}
            wrapperClassname={styles.imageWrapper}
            imageClassname={styles.coursePoster}
          />
        </WrapperWithDynamicBgImage>
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
      {!purchased && !isModer && renderBuyBtn && (
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
