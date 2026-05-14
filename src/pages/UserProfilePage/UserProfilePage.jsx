import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getUserCourses, getUserInfo } from "../../redux/user/selectors";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import UserStats from "../../components/UserStats/UserStats";
import InfoBtn from "../../components/shared/InfoBtn/InfoBtn";
import UserCertificatesList from "../../components/UserCertificatesList/UserCertificatesList";
import ProfileAuthPanel from "../../components/ProfileAuthPanel/ProfileAuthPanel";
import styles from "./UserProfilePage.module.scss";
import { getUserInfoThunk } from "../../redux/user/operations";

const DefaultBlock = ({ className, children }) => {
  return (
    <div className={`${styles.defaultBlock} ${className ? className : ""}`}>
      {children}
    </div>
  );
};

const UserProfilePage = () => {
  const userInfo = useSelector(getUserInfo);
  const myCourses = useSelector(getUserCourses);
  const dispatch = useDispatch();

  const isUserLoggedIn = userInfo.username !== ""; // remove from all child components

  console.log(myCourses);

  useEffect(() => {
    if (userInfo.accessToken) {
      dispatch(getUserInfoThunk);
    }
    // eslint-disable-next-line
  }, [userInfo.accessToken]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeIn" }}
      style={{ width: "100%", height: "100%" }}
    >
      <div className={styles.pageContainer}>
        <div className={styles.userStatsContainer}>
          <UserStats
            isUserLoggedIn={isUserLoggedIn}
            progressCourses={
              myCourses.filter(({ status }) => status === "in_progress").length
            }
            completedCourses={
              myCourses.filter(({ status }) => status === "completed").length
            }
          />
          <DefaultBlock className={styles.certificatesListContainer}>
            <div className={styles.blockHeader}>
              <h3 className={styles.cerificatesTitle}>
                Certificates of completed courses
              </h3>
              <div className={styles.btnsWrapper}>
                <InfoBtn infoContent="Your certificates will always be available here. Track your course progress and completion status anytime." />
              </div>
            </div>
            <div className={styles.blockBody}>
              {isUserLoggedIn ? <UserCertificatesList /> : <ProfileAuthPanel />}
            </div>
          </DefaultBlock>
        </div>
        <div className={styles.userDataContainer}>
          <DefaultBlock className={styles.userDataInner}>
            <UserInfoCard userInfo={userInfo} />
          </DefaultBlock>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfilePage;
