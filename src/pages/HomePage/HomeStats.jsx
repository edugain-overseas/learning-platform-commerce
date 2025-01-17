import React, { useCallback, useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { platformStats } from "../../costants/platformStats";
import { useObserver } from "../../hooks/useObserver";
import { letterGrade } from "../../utils/gradingScale";
import { ReactComponent as CoursesIcon } from "../../images/icons/HomeStats/courses.svg";
import { ReactComponent as StudentsIcon } from "../../images/icons/HomeStats/students.svg";
import { ReactComponent as ScoreIcon } from "../../images/icons/HomeStats/score.svg";
import { ReactComponent as CertificatesIcon } from "../../images/icons/HomeStats/certificates.svg";
import styles from "./HomePage.module.scss";

const renderIcon = (name) => {
  switch (name) {
    case "courses":
      return <CoursesIcon />;
    case "students":
      return <StudentsIcon />;
    case "score":
      return <ScoreIcon />;
    case "certificates":
      return <CertificatesIcon />;
    default:
      return null;
  }
};

const StatItem = ({ stat, animationStarted = false }) => {
  const statValueRef = useRef(null);

  const scoreFormatting = useCallback((value) => {
    const valuePostfix = letterGrade(value);
    return `${value} (${valuePostfix})`;
  }, []);

  const { start } = useCountUp({
    ref: statValueRef,
    start: 0,
    end: stat.value,
    duration: 3,
    startOnMount: false,
    formattingFn: stat.name === "score" && scoreFormatting,
  });

  if (animationStarted) {
    start();
  }

  return (
    <li className={styles.statItem}>
      {renderIcon(stat.name)}
      <div className={styles.statValueWrapper}>
        <span className={styles.statValue} ref={statValueRef}></span>
      </div>
      <span
        className={styles.statLabel}
        dangerouslySetInnerHTML={{ __html: stat.label }}
      ></span>
    </li>
  );
};

const HomeStats = () => {
  const stats = platformStats;
  const [startCountup, setStartCountup] = useState(false);

  const observerOption = {
    root: document.querySelector(`.${styles.container}`),
    rootMargin: "0px",
    threshold: 0,
  };

  const observerCallback = (entries) => {
    if (entries[0].isIntersecting) {
      setStartCountup(true);
    }
  };

  const sectionRef = useObserver(true, observerCallback, observerOption);

  return (
    <section className={styles.stats} ref={sectionRef}>
      <div className={styles.sectionContainer}>
        <ul className={styles.statsList}>
          {stats.map((stat) => (
            <StatItem
              stat={stat}
              key={stat.name}
              animationStarted={startCountup}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeStats;
