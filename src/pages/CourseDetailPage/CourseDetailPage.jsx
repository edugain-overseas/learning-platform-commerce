import React from "react";
import { Outlet } from "react-router-dom";
import CoursesPanel from "../../components/CoursesPanel/CoursesPanel";
import { ListModeProvider } from "../../context/ListModeContext";
import styles from "./CourseDetailPage.module.scss";

const CourseDetailPage = () => {
  
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
