import React from "react";
import { categories } from "../../assets/courses";
import CategoriesItem from "./CategoriesItem/CategoriesItem";
import styles from "./CategoriesList.module.scss";

const CategoriesList = () => {
  return (
    <ul className={styles.categoryList}>
      {categories.map((category) => (
        <CategoriesItem key={category.id} category={category} />
      ))}
    </ul>
  );
};

export default CategoriesList;
