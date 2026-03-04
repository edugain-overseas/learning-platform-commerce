import React from "react";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import { CategoryIconsProvider } from "../../context/CategoryIconsContext";
import CategoriesItem from "../../components/CategoriesList/CategoriesItem/CategoriesItem";
import CreateCategoryBtn from "../../components/CreateCategoryBtn/CreateCategoryBtn";
import styles from "./AdminCoursesDashboard.module.scss";

const AdminCoursesDashboard = () => {
  const categories = useSelector(getAllCategories);

  return (
    <CategoryIconsProvider>
      <div className={styles.wrapper}>
        <ul className={styles.categoryList}>
          {categories.map((category, index) => (
            <CategoriesItem
              key={category.id}
              category={category}
              defaultDropdownOpen={index === 0}
            />
          ))}
          <li>
            <CreateCategoryBtn />
          </li>
        </ul>
      </div>
    </CategoryIconsProvider>
  );
};

export default AdminCoursesDashboard;
