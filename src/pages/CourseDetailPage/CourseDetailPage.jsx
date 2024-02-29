import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import CoursesPanel from "../../components/CoursesPanel/CoursesPanel";
import { ListModeProvider } from "../../context/ListModeContext";
import styles from "./CourseDetailPage.module.scss";
import { useDispatch } from "react-redux";
import { getCourseDetailThunk } from "../../redux/course/operations";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseDetailThunk(+courseId));
    // eslint-disable-next-line
  }, [courseId]);

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
