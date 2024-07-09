import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./CoursesPage.module.scss";
import CoursesPanel from "../../components/CoursesPanel/CoursesPanel";
import { ListModeProvider } from "../../context/ListModeContext";
import { getAccessToken, getUserType } from "../../redux/user/selectors";
import { useSelector } from "react-redux";

const CoursesPage = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessToken);
  const userType = useSelector(getUserType) === "moder";
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/courses" && userType && userType !== "moder") {
      accessToken ? navigate("/courses/my") : navigate("/courses/available");
    }
    // eslint-disable-next-line
  }, [pathname, accessToken]);

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
