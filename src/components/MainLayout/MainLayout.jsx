import React from "react";
import Header from "../Header/Header";
import SideBar from "../SIdeBar/SideBar";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className={styles.mainWrapper}>
      <SideBar />
      <div className={styles.rightWrapper}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
