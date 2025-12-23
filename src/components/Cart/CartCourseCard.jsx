import React from "react";
import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import { useCart } from "../../context/cartContext";
import WrapperWithDynamicBgImage from "../shared/Skeletons/WrapperWithDynamicBgImage";
import ImageWithSkeleton from "../shared/Skeletons/ImageWithSkeleton";
import { serverName } from "../../http/server";
import { priceFormatter } from "../../utils/priceFormatter";

const CartCourseCard = ({ course, isProposed = false, checked = false }) => {
  const categoryInfo = useSelector(getAllCategories).find(
    (category) => category.id === course?.category_id
  );

  const { addItem, toggleChecked } = useCart();
  return (
    <div className={styles.card}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() =>
            isProposed ? addItem(course.id) : toggleChecked(course.id)
          }
        />
      </label>
      <div className={styles.courseData}>
        <WrapperWithDynamicBgImage
          url={encodeURI(`${serverName}/${course.image_path}`)}
          className={styles.posterWrapper}
        >
          <ImageWithSkeleton
            src={encodeURI(`${serverName}/${course.image_path}`)}
            wrapperClassname={styles.poster}
          />
        </WrapperWithDynamicBgImage>
        <div className={styles.textInfoWrapper}>
          <div className={styles.titleWrapper}>
            <span>{course.title}</span>
          </div>
          <div className={styles.categoryTitle}>
            <span>Category:</span>
            <span>{categoryInfo.title}</span>
          </div>
          <div className={styles.priceWrapper}>
            {course.old_price ? (
              <>
                <span className={`${styles.price} ${styles.oldPrice}`}>
                  <span>Old Price:</span>{" "}
                  <span>{priceFormatter(course.old_price)} USD</span>
                </span>
                <span className={styles.price}>
                  <span>New Price:</span>{" "}
                  <span>{priceFormatter(course.price)} USD</span>
                </span>
              </>
            ) : (
              <span className={styles.price}>
                <span>Price:</span>{" "}
                <span>{priceFormatter(course.price)} USD</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCourseCard;
