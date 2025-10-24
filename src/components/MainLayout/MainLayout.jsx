import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import ChatsFloatBtn from "../ChatsFloatBtn/ChatsFloatBtn";
// import { useSelector } from "react-redux";
// import { getAccessToken, getUserInfo } from "../../redux/user/selectors";
import Header from "../Header/Header";
import SideBar from "../SIdeBar/SideBar";
import SuspenseFallback from "../SuspenseFallback";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  const { pathname } = useLocation();
  // const accessToken = useSelector(getAccessToken);
  // const isStudent = useSelector(getUserInfo).userType === "student";

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
              <Suspense fallback={<SuspenseFallback />}>
                <Outlet />
              </Suspense>
            </div>
          ) : (
            <Suspense fallback={<SuspenseFallback />}>
              <Outlet />
            </Suspense>
          )}
        </main>
      </div>
      {/* {accessToken && isStudent && <ChatsFloatBtn />} */}
    </div>
  );
};

export default MainLayout;
