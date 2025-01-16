import React from "react";
import { ReactComponent as WebIcon } from "../../images/icons/social/web.svg";
import { ReactComponent as AppstoreIcon } from "../../images/icons/social/app-store.svg";
import { ReactComponent as Playmarketcon } from "../../images/icons/social/play-market.svg";
import styles from "./HomePage.module.scss";
import { useObserver } from "../../hooks/useObserver";

const HomeOfferInfo = () => {
  const observerOptions = {
    root: document.querySelector(`.${styles.container}`),
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observerCallback = (entries) => {
    if (entries[0].isIntersecting) {
      visualContentRef.current.classList.add(styles.animated);
    }
  };

  const visualContentRef = useObserver(true, observerCallback, observerOptions);

  return (
    <section className={styles.offerInfo}>
      <div className={styles.sectionContainer}>
        <div className={styles.offerTextContainer}>
          <h3>What do we offer?</h3>
          <div className={styles.offerText}>
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
          <ul className={styles.offerLinks}>
            <li>
              <a href="/">
                <WebIcon />
              </a>
            </li>
            <li>
              <a href="/">
                <AppstoreIcon />
              </a>
            </li>
            <li>
              <a href="/">
                <Playmarketcon />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.offerVisualContainer} ref={visualContentRef}>
          <div className={styles.deviceDesctop}></div>
          <div className={styles.deviceMobile}></div>
        </div>
      </div>
    </section>
  );
};
export default HomeOfferInfo;
