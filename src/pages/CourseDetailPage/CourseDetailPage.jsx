import React, { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { ListModeProvider } from "../../context/ListModeContext";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import CoursesPanel from "../../components/CoursesPanel/CoursesPanel";
import styles from "./CourseDetailPage.module.scss";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { pathname } = useLocation();

  const courses = useSelector(getAllCourses);
  const isExamPage = pathname.includes("exam-certificate");

  useEffect(() => {
    // eslint-disable-next-line
  }, [courseId, courses.length]);

  return (
    <div className={styles.pageWrapper}>
      {isExamPage ? (
        <Outlet />
      ) : (
        <ListModeProvider>
          <CoursesPanel />
          <div className={styles.contentWrapper}>
            <Outlet />
          </div>
        </ListModeProvider>
      )}
    </div>
  );
};

export default CourseDetailPage;
