import React from "react";
import SearchResultBlock from "./SearchResultBlock";
import CourseCard from "../../components/CoursesList/CourseCard/CourseCard";
import InstructionItem from "../../components/InstructionsList/InstructionItem";
import CategoryCardItem from "../../components/CategoryCardItem/CategoryCardItem";
import styles from "./SearchPage.module.scss";

const renderFunctions = {
  categories: (item) => <CategoryCardItem category={item} />,
  courses: (item) => <CourseCard course={item} />,
  instructions: (item) => <InstructionItem instruction={item} />,
};

const SearchResults = ({ data }) => {
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
