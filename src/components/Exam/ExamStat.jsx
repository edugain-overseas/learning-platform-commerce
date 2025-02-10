import React from "react";
import { ReactComponent as PointsIcon } from "../../images/icons/HomeStats/courses.svg";
import { ReactComponent as TimeIcon } from "../../images/icons/HomeStats/students.svg";
import { ReactComponent as AttemptsIcon } from "../../images/icons/HomeStats/score.svg";
import styles from "./Exam.module.scss";
import { letterGrade } from "../../utils/gradingScale";

const StatValue = ({ value = null, valueOf = null, label = null }) => {
  return (
    <div className={styles.statValueWrapper}>
      <div
        className={`${styles.valueWrapper} ${
          valueOf !== null ? styles.valueWithDivider : ""
        }`}
      >
        {value}
      </div>
      <div className={styles.labelContainer}>
        {valueOf !== null && (
          <div className={styles.valueOfWrapper}>{valueOf}</div>
        )}
        {label !== null && <div className={styles.labelWrapper}>{label}</div>}
      </div>
    </div>
  );
};

const ExamStat = ({ statName, statsData }) => {
  const getIcon = () => {
    switch (statName) {
      case "totalPoints":
      case "scoredPoints":
      case "testsScore":
      case "finalScore":
        return <PointsIcon />;
      case "attemptsAmount":
        return <AttemptsIcon />;
      case "totalTime":
      case "spentTime":
        return <TimeIcon />;
      default:
        return null;
    }
  };

  const statRenderValueData = () => {
    switch (statName) {
      case "totalPoints":
        return {
          value: statsData.examMaxScore,
          valueOf: null,
          label: "point",
        };
      case "totalTime":
        return {
          value: statsData.examMaxTime,
          valueOf: null,
          label: "min",
        };
      case "attemptsAmount":
        return {
          value: statsData.attemptsAmount,
          valueOf: null,
          label: "attempts",
        };
      case "testsScore":
        const testsMaxScore = 200 - statsData.examMaxScore;
        return {
          value: statsData.testsScore,
          valueOf: testsMaxScore,
          label: "Point",
        };
      case "scoredPoints":
        return {
          value: statsData.examScore,
          valueOf: statsData.examMaxScore,
          label: "Point",
        };
      case "spentTime":
        return {
          value: statsData.examTime,
          valueOf: statsData.examMaxTime,
          label: "min",
        };
      case "finalScore":
        const finalScore = statsData.examScore + statsData.testsScore;
        return {
          value: `${finalScore} (${letterGrade(finalScore)})`,
          valueOf: null,
          label: null,
        };

      default:
        return {};
    }
  };

  const getDiscription = () => {
    switch (statName) {
      case "totalPoints":
        return (
          <p>
            <b>Points</b> for passing the Exam
          </p>
        );
      case "totalTime":
        return (
          <p>
            <b>Time</b> to pass the Exam
          </p>
        );
      case "attemptsAmount":
        return (
          <p>
            <b>The best</b> result will be upheld
          </p>
        );
      case "testsScore":
        return (
          <p>
            <b>Scores</b> in tests
          </p>
        );
      case "scoredPoints":
        return (
          <p>
            <b>Points</b> scored
          </p>
        );
      case "spentTime":
        return (
          <p>
            <b>Time</b> spent on completion
          </p>
        );
      case "finalScore":
        return (
          <p>
            <b>Your</b> final score
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.statWrapper}>
      {getIcon()}
      <StatValue {...statRenderValueData()} />
      {getDiscription()}
    </div>
  );
};

export default ExamStat;
