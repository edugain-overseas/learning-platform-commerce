import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CategoryIcon } from "../../images/icons/bm.svg";
import styles from "./CategoryCardItem.module.scss";
import InfoBtn from "../shared/InfoBtn/InfoBtn";

const CategoryCardItem = ({ category }) => {
  return (
    <div className={styles.categoryItemContainer}>
      <Link
        to={`/courses/all`}
        state={{ categoryId: category.id }}
        className={styles.categoryItemContainer}
      >
        <div className={styles.categoryCard}>
          <CategoryIcon className={styles.categoryIcon} />
          <div className={styles.categoryInfo}>
            <h4 className={styles.categoryTitle}>
              <span>{category.title}</span>
            </h4>
            <p
              className={styles.certificateInfo}
              dangerouslySetInnerHTML={{ __html: category.certificate_info }}
            ></p>
          </div>
        </div>
      </Link>
      <div className={styles.infoBtnWrapper}>
        <InfoBtn infoContent={category.description} orientation="left" />
      </div>
    </div>
  );
};

export default CategoryCardItem;
