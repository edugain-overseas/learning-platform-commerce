import { ReactComponent as MedIcon } from "../../../../images/icons/HomeHeroAnimatedFragment/icon-med.svg";
import { ReactComponent as EngineeringIcon } from "../../../../images/icons/HomeHeroAnimatedFragment/icon-engineering.svg";
import styles from "./HomeHeroAnimatedFragment.module.scss";

const InnerRotationCircle = () => {
  return (
    <div className={styles.innerRotationCircle}>
      <div className={styles.medWrapper}>
        <MedIcon />
      </div>
      <div className={styles.engineeringWrapper}>
        <EngineeringIcon />
      </div>
    </div>
  );
};

export default InnerRotationCircle;
