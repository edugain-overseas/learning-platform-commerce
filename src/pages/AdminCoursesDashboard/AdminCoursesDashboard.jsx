import React from "react";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import { getAllCategories } from "../../redux/category/selectors";
import CategoriesItem from "../../components/CategoriesList/CategoriesItem/CategoriesItem";
import styles from "./AdminCoursesDashboard.module.scss";

const AdminCoursesDashboard = () => {
  const courses = useSelector(getAllCourses);
  const categories = useSelector(getAllCategories);

  console.log(courses);
  return (
    <div className={styles.wrapper}>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <CategoriesItem key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default AdminCoursesDashboard;
