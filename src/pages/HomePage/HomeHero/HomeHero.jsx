import React from "react";
import HomeHeroSearchbar from "./HomeHeroSearchbar";
import HeroAuthBtns from "./HomeAuthBtns";
import HomeHeroAnimatedFragment from "./HomeHeroAnimatedFragment/HomeHeroAnimatedFragment";
import styles from "../HomePage.module.scss";

const HomeHero = () => {
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
            In this course, you will learn the skills to understand today’s
            economy and to succeed in today’s interconnected business world.
          </p>
          <HomeHeroSearchbar />
          <HeroAuthBtns />
        </div>
        <HomeHeroAnimatedFragment />
      </div>
    </section>
  );
};

export default HomeHero;
