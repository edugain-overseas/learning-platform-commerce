import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFilteredCoursesData } from "../../hooks/useFiltredCoursesData";
import useLocalStorage from "../../hooks/useLocalStorage";
import CategoriesItem from "./CategoriesItem/CategoriesItem";
import styles from "./CategoriesList.module.scss";

const CategoriesList = () => {
  const { state } = useLocation();
  const [lastOpenCategoryId, setLastOpenCategoryId] = useLocalStorage(
    "user-preference__category-last-open",
    null,
  );

  useEffect(() => {
    if (state?.categoryId) {
      const targetElement = document.getElementById(
        `category-panel-${state.categoryId}`,
      );
      setLastOpenCategoryId(state.categoryId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // eslint-disable-next-line
  }, [state?.categoryId]);

  const { categories } = useFilteredCoursesData();

  return (
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
    </ul>
  );
};

export default CategoriesList;
