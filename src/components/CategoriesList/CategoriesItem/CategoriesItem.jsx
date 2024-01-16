import React, { useState } from "react";
import { courses } from "../../../assets/courses";
import { Link } from "react-router-dom";
import CoursesList from "../../CoursesList/CoursesList";
import { ReactComponent as BMIcon } from "../../../images/icons/bm.svg";
import { ReactComponent as InfoIcon } from "../../../images/icons/info.svg";
import { ReactComponent as ChevronIcon } from "../../../images/icons/arrowDown.svg";
import styles from "./CategoriesItem.module.scss";
import ProgressBar from "../../auth/shared/ProgressBar/ProgressBar";

const CategoriesItem = ({ category }) => {
  const [dropDownOpen, setDropDownOpen] = useState(true);

  const categoryCourses = courses.filter(
    (course) => course.categoryId === category.id
  );

  const handleToggleDropDown = (e) => {
    const dropdown = [...e.target.closest("#wrapper")?.children]?.find(
      ({ id }) => id === "dropdown"
    );
    if (dropdown) {
      console.log('dropdown exist');
      if (!dropDownOpen) {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
      } else {
        dropdown.style.maxHeight = 0 + 'px';
      }
    }
    setDropDownOpen((prev) => !prev);
  };

  return (
    <li className={styles.itemWrapper} id="wrapper">
      <div className={styles.categoryPanel}>
        <Link
          to={`/courses/category/${category.id}`}
          className={styles.titleWrapper}
        >
          <BMIcon />
          <div className={styles.nameWrapper}>
            <h3>{category.categoryName}</h3>
            <p>
              Complete all 4 courses to receive a <span>MBA Certificate</span>
            </p>
          </div>
        </Link>
        <div className={styles.tools}>
          <p>
            <span>Purchased: </span>3 / 4
          </p>
          <div className={styles.progressWrapper}>
            <span>Progress:</span>
            <ProgressBar />
          </div>
          <div className={styles.infoWrapper}>
            <span>Info the courses</span>
            <button>
              <span>
                <InfoIcon />
              </span>
            </button>
          </div>
          <button
            className={`${styles.dropdownBtn} ${
              dropDownOpen ? styles.open : ""
            }`}
            onClick={handleToggleDropDown}
          >
            <span>
              <ChevronIcon />
            </span>
          </button>
        </div>
      </div>
      <div
        className={`${styles.dropdown} ${dropDownOpen ? styles.open : ""}`}
        id="dropdown"
      >
        <div className={styles.dropDownContent}>
          <CoursesList courses={categoryCourses} />
        </div>
      </div>
    </li>
  );
};

export default CategoriesItem;
