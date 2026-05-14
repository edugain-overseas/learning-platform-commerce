import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import { ReactComponent as CategoryIcon } from "../../images/icons/bm.svg";
import HomeSlider from "./shared/HomeSlider";
import SliderSectionHeader from "./shared/SliderSectionHeader";
import styles from "./HomePage.module.scss";
import { serverName } from "../../http/server";

export const renderCategoryItem = (category) => {
  console.log(category);

  const categoryMainIconPath = category.icons.find(
    (icon) => icon.is_main,
  )?.path;

  const iconURL = `${serverName}/${categoryMainIconPath}`;

  return (
    <Link to={`/courses/all`} state={{ categoryId: category.id }}>
      <div
        className={styles.categoryCard}
        style={{ "--bg": categoryMainIconPath && `url(${iconURL})` }}
      >
        {categoryMainIconPath ? (
          <div
            className={styles.categoryIcon}
            style={{
              background: `url(${iconURL})`,
              height: "52rem",
              backgroundSize: "contain",
            }}
          ></div>
        ) : (
          <CategoryIcon className={styles.categoryIcon} />
        )}
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
        <HomeSlider renderItem={renderCategoryItem} items={categories}>
          <SliderSectionHeader
            title="Categories of Courses"
            link="courses/all"
          />
        </HomeSlider>
      </div>
    </section>
  );
};

export default HomeCategories;
