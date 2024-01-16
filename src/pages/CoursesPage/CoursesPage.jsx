import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./CoursesPage.module.scss";
import CoursesPanel from "../../components/CoursesPanel/CoursesPanel";
import { CoursesListModeProvider } from "../../context/CoursesListModeContext";

const CoursesPage = () => {
  const { pathname } = useLocation();
  const isCoursesHomePage =
    pathname === "/courses/my" ||
    pathname === "/courses/available" ||
    pathname === "/courses/completed";

  return (
    <div className={styles.pageWrapper}>
      <CoursesListModeProvider>
        {isCoursesHomePage && <CoursesPanel />}
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </CoursesListModeProvider>
    </div>
  );
};

export default CoursesPage;
