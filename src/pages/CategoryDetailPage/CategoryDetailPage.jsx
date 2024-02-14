import React from "react";
import { useParams } from "react-router-dom";
import { categories, courses } from "../../assets/courses";
import styles from "./CategoryDetailPage.module.scss";
import CoursesList from "../../components/CoursesList/CoursesList";
import ImageWithPreview from "../../components/shared/ImageWithPreview/ImageWithPreview";

const CategoryDetailPage = () => {
  const { categoryId } = useParams();

  const { categoryName, categoryAbout, categoryDesignFor, certificate } =
    categories.find(({ id }) => categoryId === `${id}`);

  const categoryCourses = courses.filter(
    ({ categoryId: id }) => `${id}` === categoryId
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.InfoWrapper}>
        <div className={styles.categoryInfoWrapper}>
          <div className={styles.title}>
            <h1>
              {categoryName}
              <span> Mini-MBA Certificate</span>
            </h1>
          </div>
          <div className={styles.about}>
            <h3>About this program</h3>
            <p>{categoryAbout}</p>
          </div>
          <div className={styles.designedFor}>
            <h3>The Mini-MBA is designed for:</h3>
            <ul>
              {categoryDesignFor.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.certificateInfoWrapper}>
          <ImageWithPreview src={certificate.sampleImage} alt={certificate.name}/>
          <ul className={styles.certificateAttributes}>
            <li>
              <span>Number of required courses:</span>
              {certificate.coursesRequiredNumber}
            </li>
            <li>
              <span>Duration:</span> {certificate.duration} hours per course
            </li>
            <li>
              <span>Level:</span> {certificate.level}
            </li>
            <li>
              <span>Price:</span>{" "}
              {certificate.price
                ? `${certificate.price} $`
                : "No additional cost"}
            </li>
            <li>
              <span>Access: </span>
              {certificate.access
                ? `${certificate.price} $`
                : "No additional cost"}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.coursesWrapper}>
        <h2>Courses in this program:</h2>
        <CoursesList courses={categoryCourses} />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
