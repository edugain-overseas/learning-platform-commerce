import React from "react";
import { renderCategoryItem } from "../HomePage/HomeCategories";
import SearchResultBlock from "./SearchResultBlock";
import CourseCard from "../../components/CoursesList/CourseCard/CourseCard";
import TaskCard from "../../components/TaskList/TaskCard";
import styles from "./SearchPage.module.scss";

const SearchResults = ({ data }) => {
  const renderFunctions = {
    categories: renderCategoryItem,
    courses: (item) => <CourseCard course={item} renderBuyBtn={false}/>,
    lessons: (item) => <TaskCard task={item} />,
  };

  const isBlockToRender = (key) => data[key] && data[key].length !== 0;

  return (
    <div className={styles.resultContainer}>
      {Object.keys(data).map(
        (key) =>
          isBlockToRender(key) && (
            <SearchResultBlock
              key={key}
              title={key}
              items={data[key]}
              renderItem={renderFunctions[key]}
            />
          )
      )}
    </div>
  );
};

export default SearchResults;
