import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import { ReactComponent as CategoryIcon } from "../../images/icons/bm.svg";
import HomeSlider from "./shared/HomeSlider";
import SliderSectionHeader from "./shared/SliderSectionHeader";
import styles from "./HomePage.module.scss";

const renderItem = (category) => {
  return (
    <Link to={`/courses/available`} state={{ categoryId: category.id }}>
      <div className={styles.categoryCard}>
        <CategoryIcon className={styles.categoryIcon} />
        <div className={styles.categoryInfo}>
          <h4 className={styles.categoryTitle}>{category.title}</h4>
          <p
            className={styles.certificateInfo}
            dangerouslySetInnerHTML={{ __html: category.certificate_info }}
          ></p>
        </div>
      </div>
    </Link>
  );
};

const HomeCategories = () => {
  const categories = useSelector(getAllCategories);
  return (
    <section className={styles.categories}>
      <div className={styles.sectionContainer}>
        <HomeSlider
          renderItem={renderItem}
          items={[...categories, ...categories, ...categories]}
        >
          <SliderSectionHeader
            title="Categories of Courses"
            link="courses/available"
          />
        </HomeSlider>
      </div>
    </section>
  );
};

export default HomeCategories;
