import React from "react";
import styles from "./AdminCoursesDashboard.module.scss";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import CoursesList from "../../components/CoursesList/CoursesList";

const AdminCoursesDashboard = () => {
  const courses = useSelector(getAllCourses);

  console.log(courses);
  return (
    <div className={styles.wrapper}>
      <CoursesList courses={courses} />
    </div>
  );
};

export default AdminCoursesDashboard;
