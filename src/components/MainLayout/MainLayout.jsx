import React from "react";
import Header from "../Header/Header";
import SideBar from "../SIdeBar/SideBar";
import styles from "./MainLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import ChatsFloatBtn from "../ChatsFloatBtn/ChatsFloatBtn";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../redux/user/selectors";

const MainLayout = () => {
  const { pathname } = useLocation();
  const accessToken = useSelector(getAccessToken);

  const isFullscreenLayout =
    pathname === "/registration" ||
    pathname === "/login" ||
    pathname === "/aboutIEU";
  const isAuthBg = pathname === "/registration" || pathname === "/login";

  return (
    <div
      className={`${
        isFullscreenLayout ? styles.isFullscreenLayout : styles.mainWrapper
      }`}
    >
      <Header />
      <div className={styles.contentWrapper}>
        <SideBar />
        <main
          className={styles.main}
          style={{
            backgroundImage: isFullscreenLayout
              ? isAuthBg
                ? "var(--bg-auth)"
                : "var(--bg-aboutIEU)"
              : "none",
          }}
        >
          {isFullscreenLayout ? (
            <div className={styles.pageContent}>
              <Outlet />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
      {accessToken && <ChatsFloatBtn />}
    </div>
  );
};

export default MainLayout;
