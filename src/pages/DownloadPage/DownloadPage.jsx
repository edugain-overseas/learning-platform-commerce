import styles from "./DownloadPage.module.scss";
import { ReactComponent as AppstoreIcon } from "../../images/icons/social/app-store.svg";
import { ReactComponent as Playmarketcon } from "../../images/icons/social/play-market.svg";

const DownloadPage = () => {
  return (
    <section className={styles.downloadInfo}>
      <div className={styles.sectionContainer}>
        <div className={styles.downloadTextContainer}>
          <h3>What do we offer?</h3>
          <div className={styles.downloadText}>
            <p>
              Enhance your <b>professional knowledge and skills</b> through a
              wide range of online courses and programs designed to meet your
              needs.
            </p>
            <p>
              Choose from various subjects and fields to advance your expertise
              at your own pace, all from the{" "}
              <b>comfort of your home or office</b>. Upon completing your chosen
              courses, you will receive an official online certificate that
              validates your efforts and accomplishments.
            </p>
            <p>
              Empower yourself with the{" "}
              <b>flexibility to learn anytime, anywhere, and achieve</b> your
              professional goals.
            </p>
          </div>
          <ul className={styles.downloadLinks}>
            <li>
              <a href="https://apps.apple.com/gb/app/feu-courses/id6742498936">
                <AppstoreIcon />
                <div>App Store</div>
              </a>
            </li>
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=io.ieucourses.app"
                target="_blank"
                rel="noreferrer"
              >
                <Playmarketcon />
                <div>Google play</div>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.downloadVisualContainer}>
          <div className={styles.deviceDesctop}>
            <img
              src="/images/home_device_desktop.webp"
              alt="Happy Student"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <div className={styles.deviceMobile}>
            <img
              src="/images/home_device_mobile.webp"
              alt="Happy Student"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadPage;
