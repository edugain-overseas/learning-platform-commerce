import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavLinksPanel from "../../components/shared/NavLinksPanel/NavLinksPanel";
import styles from "./CoursesPage.module.scss";

const CoursesPage = () => {
  const { pathname } = useLocation();
  const isCoursesHomePage =
    pathname === "/courses/all" || pathname === "/courses/my";

  const renderLinks = [
    {
      to: "my",
      content: `my courses`,
    },
    {
      to: "all",
      content: "all courses",
    },
  ];
  
  return (
    <div className={styles.pageWrapper}>
      {isCoursesHomePage && <NavLinksPanel renderLinks={renderLinks} />}
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default CoursesPage;
