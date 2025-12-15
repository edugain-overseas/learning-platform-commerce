import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserType } from "../../../redux/user/selectors";
// import { useCart } from "../../../context/cartContext";
import { serverName } from "../../../http/server";
import { ReactComponent as ArrowRightIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as ClockIcon } from "../../../images/icons/clock.svg";
import { ReactComponent as LaptopIcon } from "../../../images/icons/laptop.svg";
// import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
// import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import CardGrade from "../../shared/CardGrade/CardGrade";
import CardPrice from "../../shared/CardPrice/CardPrice";
import ImageWithSkeleton from "../../shared/Skeletons/ImageWithSkeleton";
import WrapperWithDynamicBgImage from "../../shared/Skeletons/WrapperWithDynamicBgImage";
import styles from "./CourseCard.module.scss";
import BuyCourseBtn from "../../shared/BuyCourseBtn/BuyCourseBtn";

const CourseCard = ({
  course,
  disabled,
  containerClassname = "",
  renderBuyBtn = true,
}) => {
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

  const courseLink = `/course/${id}/` + (bought ? "tasks" : "intro");

  return (
    <div
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
              bought && (
                <div className={styles.progressWrapper}>
                  <span>Progress:</span>
                  <ProgressBar
                    value={progress}
                    width={104}
                    height={14}
                    disabled={!bought}
                  />
                </div>
              )
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
              {bought ? (
                <CardGrade grade={grade} />
              ) : (
                <CardPrice
                  price={price}
                  oldPrice={oldPrice}
                  orientation="horizontal"
                />
              )}
              {!bought && !isModer && renderBuyBtn && (
                <BuyCourseBtn courseId={course.id} className={styles.cardBtn} />
              )}
            </div>
          </div>
        </div>
      </Link>
      {/* {!bought && !isModer && renderBuyBtn && (
        <button
          className={styles.cardBtn}
          onClick={(e) =>
            isItemInCart ? handleRemoveFromCart(e, id) : handleAddToCart(e, id)
          }
        >
          <span>{isItemInCart ? "Remove" : "Buy"}</span>
          {isItemInCart ? <TrashIcon /> : <CartIcon />}
        </button>
      )} */}
    </div>
  );
};

export default CourseCard;
