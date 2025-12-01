import React, { useEffect } from "react";
import CategoriesItem from "./CategoriesItem/CategoriesItem";
import { useLocation } from "react-router-dom";
import { useFilteredCoursesData } from "../../hooks/useFiltredCoursesData";
import styles from "./CategoriesList.module.scss";

const CategoriesList = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (state?.categoryId) {
      const targetElement = document.getElementById(
        `category-panel-${state.categoryId}`
      );
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [state?.categoryId]);

  const { categories } = useFilteredCoursesData();

  return (
    <ul className={styles.categoryList}>
      {categories.map((category) => (
        <CategoriesItem
          key={category.id}
          category={category}
        />
      ))}
    </ul>
  );
};

export default CategoriesList;
