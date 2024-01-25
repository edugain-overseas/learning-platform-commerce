import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./CoursesPage.module.scss";
import CoursesPanel from "../../components/CoursesPanel/CoursesPanel";
import { ListModeProvider } from "../../context/ListModeContext";

const CoursesPage = () => {
  // const { pathname } = useLocation();
  // const isCoursesHomePage =
  //   pathname === "/courses/my" ||
  //   pathname === "/courses/available" ||
  //   pathname === "/courses/completed";

  return (
    <div className={styles.pageWrapper}>
      <ListModeProvider>
        <CoursesPanel />
        <div
          className={styles.contentWrapper}
          // style={{ paddingInline: isCoursesHomePage ? "32rem" : 0 }}
        >
          <Outlet />
        </div>
      </ListModeProvider>
    </div>
  );
};

export default CoursesPage;
