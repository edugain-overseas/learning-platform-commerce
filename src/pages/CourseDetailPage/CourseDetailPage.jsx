import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import CoursesPanel from "../../components/CoursesPanel/CoursesPanel";
import { ListModeProvider } from "../../context/ListModeContext";
import styles from "./CourseDetailPage.module.scss";
import {  useSelector } from "react-redux";
// import { getCourseDetailThunk } from "../../redux/course/operations";
import { getAllCourses } from "../../redux/course/selectors";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const courses = useSelector(getAllCourses);
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getCourseDetailThunk(+courseId));
    // eslint-disable-next-line
  }, [courseId, courses.length]);

  return (
    <div className={styles.pageWrapper}>
      <ListModeProvider>
        <CoursesPanel />
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </ListModeProvider>
    </div>
  );
};

export default CourseDetailPage;
