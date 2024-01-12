import React from "react";
import Header from "../Header/Header";
import SideBar from "../SIdeBar/SideBar";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import ChatsFloatBtn from "../ChatsFloatBtn/ChatsFloatBtn";

const MainLayout = () => {
  return (
    <div className={styles.mainWrapper}>
        <Header />
      <div className={styles.contentWrapper}>
      <SideBar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <ChatsFloatBtn />
    </div>
  );
};

export default MainLayout;
