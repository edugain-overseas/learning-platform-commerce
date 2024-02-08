import React, { useState } from "react";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import UserMainStats from "../../components/UserMainStats/UserMainStats";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrowDown.svg";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as TaskViewIcon } from "../../images/icons/task-view.svg";
import { ReactComponent as TaskCompletedIcon } from "../../images/icons/task-completed.svg";
import styles from "./UserProfilePage.module.scss";
import CircleProgressCard from "../../components/CircleProgressCard/CircleProgressCard";
import InfoBtn from "../../components/shared/InfoBtn/InfoBtn";

const UserProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.pageWrappper}>
      <div className={styles.leftWrapper}>
        <div
          className={styles.topWrapper}
          style={{ height: isOpen ? "44rem" : "331rem" }}
        >
          {!isOpen ? (
            <>
              <UserInfoCard />
              <UserMainStats />
            </>
          ) : (
            <div className={styles.mainStatsRowWrapper}>
              <h3>My Profile</h3>
              <div className={styles.rowRightWrapper}>
                <div className={styles.itemsWrapper}>
                  <div className={styles.item}>
                    <ClockIcon />
                    <p>{"12h 12m  |  studying time"}</p>
                  </div>
                  <div className={styles.item}>
                    <TaskViewIcon />
                    <p>4 courses in progress</p>
                  </div>
                  <div className={styles.item}>
                    <TaskCompletedIcon />
                    <p>3 completed courses</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen((prev) => !prev)}>
                  <div>
                    <ArrowDownIcon
                      className={styles.arrowIcon}
                      style={{
                        transform: `rotate(${isOpen ? "0" : "-180deg"})`,
                      }}
                    />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.bottomWrapper}>
          <div className={styles.blockHeader}>
            <h3 className={styles.cerificatesTitle}>
              Certificates of completed courses
            </h3>
            <div className={styles.btnsWrapper}>
              <InfoBtn infoContent="The average score is calculated based on all courses you have completed" />

              <button onClick={() => setIsOpen((prev) => !prev)}>
                <div>
                  <ArrowDownIcon
                    className={styles.arrowIcon}
                    style={{ transform: `rotate(${isOpen ? "0" : "-180deg"})` }}
                  />
                </div>
              </button>
            </div>
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
    </div>
  );
};

export default UserProfilePage;
