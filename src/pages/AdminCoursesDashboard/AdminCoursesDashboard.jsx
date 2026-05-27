import React from "react";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import { CategoryIconsProvider } from "../../context/CategoryIconsContext";
import CategoriesItem from "../../components/CategoriesList/CategoriesItem/CategoriesItem";
import CreateCategoryBtn from "../../components/CreateCategoryBtn/CreateCategoryBtn";
import styles from "./AdminCoursesDashboard.module.scss";
import useLocalStorage from "../../hooks/useLocalStorage";

const AdminCoursesDashboard = () => {
  const categories = useSelector(getAllCategories);
  const [lastOpenCategoryId, setLastOpenCategoryId] = useLocalStorage(
    "admin-preference__category-last-open",
    null,
  );

  return (
    <CategoryIconsProvider>
      <div className={styles.wrapper}>
        <ul className={styles.categoryList}>
          {categories.map((category, index) => (
            <CategoriesItem
              key={category.id}
              category={category}
              defaultDropdownOpen={
                lastOpenCategoryId
                  ? lastOpenCategoryId === category.id
                  : index === 0
              }
              lastOpenCategoryId={lastOpenCategoryId}
              setLastOpenCategoryId={setLastOpenCategoryId}
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
