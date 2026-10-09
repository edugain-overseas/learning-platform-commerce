import React from "react";
import HomeHeroSearchbar from "./HomeHeroSearchbar";
import HeroAuthBtns from "./HomeAuthBtns";
import HomeHeroAnimatedFragment from "./HomeHeroAnimatedFragment/HomeHeroAnimatedFragment";
import { ReactComponent as MouseIcon } from "../../../images/icons/mouse.svg";
import styles from "../HomePage.module.scss";

const HomeHero = ({ showArrow }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.sectionContainer}>
        <div>
          <h1 className={styles.heroTitle}>
            <span className={styles.primaryText}>Online learning</span>
            <span className={styles.secondaryText}>
              {" "}
              is <span className={styles.accentText}>now</span> in Your Hands{" "}
              <span className={styles.symbol}>🫰</span>
            </span>
          </h1>
          <p className={styles.heroText}>
            In our courses, you will learn the skills to understand today’s
            economy and succeed in the modern business world.
          </p>
          <HomeHeroSearchbar />
          <HeroAuthBtns />
        </div>
        <HomeHeroAnimatedFragment />
      </div>
      <MouseIcon
        className={`${styles.mouse} ${showArrow ? "" : styles.hidden}`}
      />
    </section>
  );
};

export default HomeHero;
