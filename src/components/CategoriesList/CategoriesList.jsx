import React from "react";
import { categories } from "../../assets/courses";
import CategoriesItem from "./CategoriesItem/CategoriesItem";
import styles from "./CategoriesList.module.scss";
import { useLocation } from "react-router-dom";

const CategoriesList = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  // const getCategories = () => {
  //   switch (pathname) {
  //     case "/courses/my":
  //       return categories.filter((category) =>
  //         courses.filter((course) => course.categoryId === category.id).find(({purchased})=>pur)
  //       );

  //     default:
  //       break;
  //   }
  // };

  return (
    <ul className={styles.categoryList}>
      {categories.map((category) => (
        <CategoriesItem key={category.id} category={category} />
      ))}
    </ul>
  );
};

export default CategoriesList;
