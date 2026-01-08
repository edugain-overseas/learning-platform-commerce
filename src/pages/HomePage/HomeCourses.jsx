import React from "react";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import HomeSlider from "./shared/HomeSlider";
import SliderSectionHeader from "./shared/SliderSectionHeader";
import CourseCard from "../../components/CoursesList/CourseCard/CourseCard";
import styles from "./HomePage.module.scss";

const renderItem = (course) => {
  return <CourseCard course={course} containerClassname={styles.courseCardContainer} renderBuyBtn={true}/>;
};

const HomeCourses = () => {
  const courses = useSelector(getAllCourses);
  return (
    <section className={styles.courses}>
      <div className={styles.sectionContainer}>
        <HomeSlider renderItem={renderItem} items={courses}>
          <SliderSectionHeader
            title="Most popular Courses"
            link="courses/all"
          />
        </HomeSlider>
      </div>
    </section>
  );
};

export default HomeCourses;
