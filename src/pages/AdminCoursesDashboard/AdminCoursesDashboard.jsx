import React from "react";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import { getAllCategories } from "../../redux/category/selectors";
import { getUserInfo } from "../../redux/user/selectors";
import CategoriesItem from "../../components/CategoriesList/CategoriesItem/CategoriesItem";
import styles from "./AdminCoursesDashboard.module.scss";
import CreateCategoryBtn from "../../components/CreateCategoryBtn/CreateCategoryBtn";

const AdminCoursesDashboard = () => {
  const courses = useSelector(getAllCourses);
  const categories = useSelector(getAllCategories);
  const isModer = useSelector(getUserInfo).userType === "moder";

  console.log(courses);
  return (
    <div className={styles.wrapper}>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <CategoriesItem key={category.id} category={category} />
        ))}
        {isModer && (
          <li>
            <CreateCategoryBtn />
          </li>
        )}
      </ul>
    </div>
  );
};

export default AdminCoursesDashboard;
