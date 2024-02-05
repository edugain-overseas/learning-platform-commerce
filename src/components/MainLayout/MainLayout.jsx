import React from "react";
import Header from "../Header/Header";
import SideBar from "../SIdeBar/SideBar";
import styles from "./MainLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import ChatsFloatBtn from "../ChatsFloatBtn/ChatsFloatBtn";

const MainLayout = () => {
  const { pathname } = useLocation();

  const isAuthLayout = pathname === "/registration" || pathname === "/login";

  return (
    <div className={`${isAuthLayout ? styles.authLayout : styles.mainWrapper}`}>
      <Header />
      <div className={styles.contentWrapper}>
        <SideBar />
        <main className={styles.main}>
          {isAuthLayout ? (
            <div className={styles.formWrapper}>
              <Outlet />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
      <ChatsFloatBtn />
    </div>
  );
};

export default MainLayout;
