import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./CoursesPage.module.scss";
import CoursesPanel from "../../components/CoursesPanel/CoursesPanel";
import { ListModeProvider } from "../../context/ListModeContext";

const CoursesPage = () => {
  const { pathname } = useLocation();
  const isCoursesHomePage =
    pathname === "/courses/my" ||
    pathname === "/courses/available" ||
    pathname === "/courses/completed";

  return (
    <div className={styles.pageWrapper}>
      <ListModeProvider>
        {isCoursesHomePage && <CoursesPanel />}
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </ListModeProvider>
    </div>
  );
};

export default CoursesPage;
