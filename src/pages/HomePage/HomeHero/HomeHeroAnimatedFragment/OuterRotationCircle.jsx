import { ReactComponent as BusinessIcon } from "../../../../images/icons/HomeHeroAnimatedFragment/icon-business.svg";
import { ReactComponent as ClockIcon } from "../../../../images/icons/HomeHeroAnimatedFragment/icon-clock.svg";
import { ReactComponent as ItIcon } from "../../../../images/icons/HomeHeroAnimatedFragment/icon-it.svg";
import { ReactComponent as LawIcon } from "../../../../images/icons/HomeHeroAnimatedFragment/icon-law.svg";
import { ReactComponent as GradeAIcon } from "../../../../images/icons/HomeHeroAnimatedFragment/icon-gradeA.svg";
import { ReactComponent as SocialIcon } from "../../../../images/icons/HomeHeroAnimatedFragment/icon-social.svg";
import { ReactComponent as NotificationIcon } from "../../../../images/icons/HomeHeroAnimatedFragment/icon-notification.svg";
import styles from "./HomeHeroAnimatedFragment.module.scss";

const OuterRotationCircle = ({ children }) => {
  return (
    <div className={styles.outerRotationCircle}>
      <div className={styles.rotater}>
        <div className={styles.businessWrapper}>
          <BusinessIcon />
        </div>
        <div className={styles.clockWrapper}>
          <ClockIcon />
        </div>
        <div className={styles.itWrapper}>
          <ItIcon />
        </div>
        <div className={styles.lawWrapper}>
          <LawIcon />
        </div>
        <div className={styles.gradeWrapper}>
          <GradeAIcon />
        </div>
        <div className={styles.socialWrapper}>
          <SocialIcon />
        </div>
        <div className={styles.notificationWrapper}>
          <NotificationIcon />
        </div>
      </div>

      {children}
    </div>
  );
};

export default OuterRotationCircle;
