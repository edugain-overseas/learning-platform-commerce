import React from "react";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import CategoriesItem from "../../components/CategoriesList/CategoriesItem/CategoriesItem";
import styles from "./AdminCoursesDashboard.module.scss";
import CreateCategoryBtn from "../../components/CreateCategoryBtn/CreateCategoryBtn";

const AdminCoursesDashboard = () => {
  const categories = useSelector(getAllCategories);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <CategoriesItem key={category.id} category={category} />
        ))}
        <li>
          <CreateCategoryBtn />
        </li>
      </ul>
    </div>
  );
};

export default AdminCoursesDashboard;
