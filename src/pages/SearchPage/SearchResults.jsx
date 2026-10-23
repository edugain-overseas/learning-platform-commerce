import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import SearchResultBlock from "./SearchResultBlock";
import CourseCard from "../../components/CoursesList/CourseCard/CourseCard";
import InstructionItem from "../../components/InstructionsList/InstructionItem";
import CategoryCardItem from "../../components/CategoryCardItem/CategoryCardItem";
import styles from "./SearchPage.module.scss";

const SearchResults = ({ data }) => {
  const isBlockToRender = (key) => data[key] && data[key].length !== 0;
  const coursesData = useSelector(getAllCourses);

  const renderFunctions = {
    categories: (item) => <CategoryCardItem category={item} />,
    courses: (item) => (
      <CourseCard
        course={coursesData.find((course) => course.id === item.id)}
      />
    ),
    instructions: (item) => <InstructionItem instruction={item} />,
  };

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
          ),
      )}
    </div>
  );
};

export default SearchResults;
