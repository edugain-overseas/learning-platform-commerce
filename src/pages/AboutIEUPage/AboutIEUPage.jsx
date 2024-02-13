import React from "react";
import textIcon from "../../images/textIcon.png";
import styles from "./AboutIEUPage.module.scss";

const AboutIEUPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textBlock}>
        <h2 className={styles.mainTitle}>About IEU</h2>
        <div className={styles.textWithIconWrapper}>
          <img src={textIcon} alt="student" />
          <p className={`${styles.text} ${styles.textWithIcon}`}>
            Welcome to the website of the 
            <b>International European University.</b> We are the most modern
            multidisciplinary University in Malta and the European Union. We
            offer English-taught medical programs, professional degrees in
            Malta, and affordable medical internships <b>in Europe</b>.
          </p>
        </div>
        <p className={styles.text}>
          <b>International European University</b>, is excited to welcome 
          <b>
            new international students and foreign exchange students from Europe
          </b>{" "}
          and all over the world! Are you ready to study MBBS in Gzira,
          undertake medical internships in Malta and Europe, challenge old
          ideas, and develop the world around you by collaborating with
          brilliant minds and the best practitioners?
        </p>
        <p className={styles.text}>
          We are the <b>right choice for you!</b> What is the best university to
          study medicine in Malta? Sure, International European University,
          Malta Campus is the best option for students seeking to pursue an MBBS
          course in Malta.
        </p>
      </div>
      <div className={styles.textBlock}>
        <h3 className={styles.secondaryTitle}>Our Mission</h3>
        <p className={styles.text}>
          Provide international students of the 
          <b>International  European University</b> in Malta with the
          best facilities, knowledge, technologies, and internships in Malta to
          make the world a better place for everyone. IEU, Malta Campus’s
          student community is an active participant. Student community is an
          active participant.
        </p>
      </div>
      <div className={styles.textBlock}>
        <h3 className={styles.secondaryTitle}>Our Mission</h3>
        <p className={styles.text}>
          Provide international students of the 
          <b>International  European University</b> in Malta with the
          best facilities, knowledge, technologies, and internships in Malta to
          make the world a better place for everyone. IEU, Malta Campus’s
          student community is an active participant. Student community is an
          active participant.
        </p>
      </div>
    </div>
  );
};

export default AboutIEUPage;
