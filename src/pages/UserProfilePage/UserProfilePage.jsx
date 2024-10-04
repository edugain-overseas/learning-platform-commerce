import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getActiveTime,
  getUserCourses,
  getUserInfo,
} from "../../redux/user/selectors";
import { useActiveTime } from "../../context/activeTimeContext";
import { convertMillisecondsToHoursAndMinutes } from "../../utils/formatTime";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrowDown.svg";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import UserStats from "../../components/UserStats/UserStats";
import CircleProgressCard from "../../components/CircleProgressCard/CircleProgressCard";
import InfoBtn from "../../components/shared/InfoBtn/InfoBtn";
import InsetBtn from "../../components/shared/InsetBtn/InsetBtn";
import styles from "./UserProfilePage.module.scss";
import UserCertificatesList from "../../components/UserCertificatesList/UserCertificatesList";

const UserProfilePage = () => {
  const [isCertificatesExpanded, setIsCertificatesExpanded] = useState(false);
  const userInfo = useSelector(getUserInfo);
  const prevActiveTime = useSelector(getActiveTime);
  const myCourses = useSelector(getUserCourses);

  const activeTime = useActiveTime();
  const activeTimeToDisplay = prevActiveTime
    ? prevActiveTime + activeTime
    : activeTime;

  const { hours, minutes } =
    convertMillisecondsToHoursAndMinutes(activeTimeToDisplay);

  const arrowDownIconStyle = {
    transform: `rotate(${isCertificatesExpanded ? "0" : "-180deg"})`,
  };

  return (
    <div className={styles.pageWrappper}>
      {!userInfo.userId ? (
        <div>please sing in</div>
      ) : (
        <>
          <div className={styles.leftWrapper}>
            <div
              className={styles.topWrapper}
              style={{ height: isCertificatesExpanded ? "44rem" : "331rem" }}
            >
              {!isCertificatesExpanded && <UserInfoCard userInfo={userInfo} />}
              <UserStats
                minimized={isCertificatesExpanded}
                hours={hours}
                minutes={minutes}
                progressCourses={
                  myCourses.filter(({ status }) => status === "in_progress")
                    .length
                }
                completedCourses={
                  myCourses.filter(({ status }) => status === "completed")
                    .length
                }
                handleCollapseCerficates={() =>
                  setIsCertificatesExpanded(false)
                }
              />
            </div>
            <div className={styles.bottomWrapper}>
              <div className={styles.blockHeader}>
                <h3 className={styles.cerificatesTitle}>
                  Certificates of completed courses
                </h3>
                <div className={styles.btnsWrapper}>
                  <InfoBtn infoContent="The average score is calculated based on all courses you have completed" />
                  <InsetBtn
                    icon={
                      <ArrowDownIcon
                        className={styles.arrowIcon}
                        style={arrowDownIconStyle}
                      />
                    }
                    width="24rem"
                    height="24rem"
                    onClick={() => setIsCertificatesExpanded((prev) => !prev)}
                  />
                </div>
              </div>
              <div className={styles.blockBody}>
                <UserCertificatesList />
              </div>
            </div>
          </div>
          <div className={styles.rightWrapper}>
            <div className={styles.cardWrapper}>
              <CircleProgressCard
                cardTitle="Grade Point Average"
                strokeColor="#FCC400"
                progressTitle={
                  <div className={styles.progressTitle}>
                    <span className={styles.name}>Average</span>
                    <span className={styles.value}>172(B)</span>
                  </div>
                }
              />
            </div>
            <div className={styles.cardWrapper}>
              <CircleProgressCard
                cardTitle="Grade Point Average"
                strokeBackGround="f0f0f0"
                strokeColor="#39BA6D"
                outerColor="#d9d9d9"
                progressTitle={
                  <div className={styles.progressTitle}>
                    <span className={styles.name}>Complited</span>
                    <span className={styles.value}>
                      75<span>%</span>
                    </span>
                  </div>
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
