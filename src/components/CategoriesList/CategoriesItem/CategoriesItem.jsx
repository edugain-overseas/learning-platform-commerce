import React from "react";
import { courses } from "../../../assets/courses";
import { Link } from "react-router-dom";
import CoursesList from "../../CoursesList/CoursesList";
import styles from "./CategoriesItem.module.scss";

const CategoriesItem = ({ category }) => {
  const categoryCourses = courses.filter(
    (course) => course.categoryId === category.id
  );
  return (
    <li className={styles.itemWrapper}>
      <div className={styles.titleWrapper}>
        <h2>{category.categoryName}</h2>
        <span>{categoryCourses.length} Courses</span>
      </div>
      <Link className={styles.linkWrapper} to={`/courses/category/${category.id}`}>
        Complete all {category.certificate.coursesRequiredNumber} courses to
        receive <span>{category.certificate.name}</span>
      </Link>
      <CoursesList courses={categoryCourses} />
    </li>
  );
};

export default CategoriesItem;
