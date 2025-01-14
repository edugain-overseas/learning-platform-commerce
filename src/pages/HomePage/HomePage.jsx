import React from "react";
import styles from "./HomePage.module.scss";
import HomeHero from "./HomeHero";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <HomeHero />
      <HomeHero />
    </div>
  );
};

export default HomePage;
