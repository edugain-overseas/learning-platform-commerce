import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as ArrowRightIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as ClockIcon } from "../../../images/icons/clock.svg";
import { ReactComponent as LaptopIcon } from "../../../images/icons/laptop.svg";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import CardGrade from "../../shared/CardGrade/CardGrade";
import CardPrice from "../../shared/CardPrice/CardPrice";
import styles from "./CourseRow.module.scss";
import BuyCourseBtn from "../../shared/BuyCourseBtn/BuyCourseBtn";

const CourseRow = ({ course, disabled }) => {
  const { addItem, cartItems, handleOpen } = useCart();

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


  const handleMouseEnder = (e) => {
    console.dir(e.target.querySelector("span"));
    const text = e.target.querySelector("span");

    if (text) {
      text.style.setProperty("width", `${text.scrollWidth}px`);
    }
  };

  const handleMouseLeave = (e) => {
    const text = e.target.querySelector("span");

    if (text) {
      text.style.setProperty("width", "0px");
    }
  };

  return (
    <div className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      <Link className={styles.courseLink} to={`/course/${id}/intro`}>
        <h3 className={styles.title}>
          {courseName}
          <span className={styles.openBtn}>
            <ArrowRightIcon />
          </span>
        </h3>
        <div className={styles.courseInfo}>
          {bought && (
            <div className={styles.progressWrapper}>
              <span>Progress:</span>
              <ProgressBar value={progress} width={104} height={14} />
            </div>
          )}
          <div className={styles.details}>
            <ClockIcon />
            <span>
              {courseDuration} hours {"(self paced)"}
            </span>
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
                divider={true}
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
          {!bought && (
            <div
              onMouseEnter={handleMouseEnder}
              onMouseLeave={handleMouseLeave}
            >
              <BuyCourseBtn courseId={course.id} className={styles.cardBtn} />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CourseRow;
