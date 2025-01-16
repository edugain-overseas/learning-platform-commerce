import React from "react";
import HomeHero from "./HomeHero/HomeHero";
import HomeCategories from "./HomeCategories";
import HomeCourses from "./HomeCourses";
import HomeStats from "./HomeStats";
import HomeOfferInfo from "./HomeOfferInfo";
import HomeFooter from "./HomeFooter";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <HomeHero />
      <HomeCategories />
      <HomeCourses />
      <HomeStats />
      <HomeOfferInfo />
      <HomeFooter/>
    </div>
  );
};

export default HomePage;
