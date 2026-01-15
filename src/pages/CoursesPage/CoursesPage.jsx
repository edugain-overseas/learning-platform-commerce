import React from "react";
import { Outlet } from "react-router-dom";
import { ListModeProvider } from "../../context/ListModeContext";
import CoursesPanel from "../../components/CoursesPanel/CoursesPanel";
import DiscountPanel from "../../components/DiscountPanel/DiscountPanel";
import styles from "./CoursesPage.module.scss";

const CoursesPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <ListModeProvider>
        <CoursesPanel />
        <div className={styles.discountWrapper}>
          <DiscountPanel />
        </div>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </ListModeProvider>
    </div>
  );
};

export default CoursesPage;
