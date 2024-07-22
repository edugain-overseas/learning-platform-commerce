import React from "react";
import CategoriesItem from "./CategoriesItem/CategoriesItem";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import { useLocation } from "react-router-dom";
import { getUserCourses } from "../../redux/user/selectors";
import { getAllCourses } from "../../redux/course/selectors";
import styles from "./CategoriesList.module.scss";

const CategoriesList = () => {
  const categories = useSelector(getAllCategories);
  const userCourses = useSelector(getUserCourses);
  const allCourses = useSelector(getAllCourses);
  const { pathname } = useLocation();

  const categoriesWithCourses = categories.filter(({ id }) => {
    return allCourses.find(({ category_id }) => category_id === id);
  });

  console.log(categoriesWithCourses);

  const filterCategoriesForPage = () => {
    switch (pathname) {
      case "/courses/my":
        return categoriesWithCourses.filter(({ id: categoryId }) => {
          const categoryCourses = allCourses.filter(
            ({ category_id }) => category_id === categoryId
          );
          return categoryCourses.find(({ id }) =>
            userCourses.find(({ course_id }) => course_id === id)
          );
        });
      case "/courses/available":
        return categoriesWithCourses;
      case "/courses/completed":
        return categoriesWithCourses.filter(({ id: categoryId }) => {
          const categoryCourses = allCourses.filter(
            ({ category_id }) => category_id === categoryId
          );
          return categoryCourses.find(({ id }) =>
            userCourses.find(
              (userCourse) =>
                userCourse.course_id === id && userCourse.status === "completed"
            )
          );
        });
      default:
        break;
    }
  };

  return (
    <ul className={styles.categoryList}>
      {filterCategoriesForPage().map((category) => (
        <CategoriesItem key={category.id} category={category} />
      ))}
    </ul>
  );
};

export default CategoriesList;
