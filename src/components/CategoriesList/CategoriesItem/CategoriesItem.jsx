import React, { useState } from "react";
// import { courses } from "../../../assets/courses";
import { Link } from "react-router-dom";
import CoursesList from "../../CoursesList/CoursesList";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";
import { getUserCourses } from "../../../redux/user/selectors";
import { useListMode } from "../../../context/ListModeContext";
import { ReactComponent as BMIcon } from "../../../images/icons/bm.svg";
import { ReactComponent as ChevronIcon } from "../../../images/icons/arrowDown.svg";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import InfoBtn from "../../shared/InfoBtn/InfoBtn";
import styles from "./CategoriesItem.module.scss";

const CategoriesItem = ({ category }) => {
  const [dropDownOpen, setDropDownOpen] = useState(true);

  const courses = useSelector(getAllCourses);
  const userCourses = useSelector(getUserCourses);

  const { listModeIndex } = useListMode();

  const categoryCourses = courses.filter(
    (course) => course.category_id === category.id
  );

  const userCoursesinCategory = categoryCourses.filter(({ id }) =>
    userCourses.find(({ course_id }) => course_id === id)
  );

  const handleToggleDropDown = (e) => {
    const dropdown = [...e.target.closest("#wrapper")?.children]?.find(
      ({ id }) => id === "dropdown"
    );
    if (dropdown) {
      if (!dropDownOpen) {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
      } else {
        dropdown.style.maxHeight = 0 + "px";
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
            <h3>{category.title}</h3>
            <p>
              Complete all 4 courses to receive a <span>MBA Certificate</span>
            </p>
          </div>
        </Link>
        <div className={styles.tools}>
          <p>
            <span>Purchased: </span>
            {`${userCoursesinCategory.length} / ${categoryCourses.length}`}
          </p>
          <div className={styles.progressWrapper}>
            <span>Progress:</span>
            <ProgressBar value={25} />
          </div>
          <div className={styles.infoWrapper}>
            <span>Info the courses</span>
            <InfoBtn infoContent={category.description} orientation="bottom" />
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
        <div
          className={styles.dropDownContent}
          style={{ paddingTop: listModeIndex ? "16rem" : "8rem" }}
        >
          <CoursesList courses={categoryCourses} />
        </div>
      </div>
    </li>
  );
};

export default CategoriesItem;
