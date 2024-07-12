import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import AdminCourseConstructorPage from "../AdminCourseConstructorPage/AdminCourseConstructorPage";
import styles from "./AdminCourseEditPage.module.scss";

const AdminCourseEditPage = () => {
  const { courseId } = useParams();

  const courseData = useSelector(getAllCourses).find(
    ({ id }) => id === +courseId
  );
  return (
    <div className={styles.pageWrapper}>
      {courseData ? (
        <AdminCourseConstructorPage courseData={courseData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminCourseEditPage;
