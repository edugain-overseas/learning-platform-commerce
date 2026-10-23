import happyStudent from "../../../../images/happy-student.webp";
import InnerRotationCircle from "./InnerRotationCircle";
import OuterRotationCircle from "./OuterRotationCircle";
import styles from "./HomeHeroAnimatedFragment.module.scss";
//
const HomeHeroAnimatedFragment = () => {
  return (
    <div className={`${styles.outerWrapper} ${styles.animated}`}>
      <OuterRotationCircle>
        <div className={styles.innerWrapper}>
          <InnerRotationCircle />
          <div className={styles.innerCircle}></div>
          <div className={styles.mediaObjectWrapper}>
            <div className={styles.mediaObjectShadow}>
              <img src={happyStudent} alt="Happy Student" loading="eager" />
            </div>
            <div className={styles.mediaObject}>
              <img src={happyStudent} alt="Happy Student" loading="eager" />
            </div>
          </div>
        </div>
      </OuterRotationCircle>
    </div>
  );
};

export default HomeHeroAnimatedFragment;
