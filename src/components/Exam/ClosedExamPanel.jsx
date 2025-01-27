import React from "react";
import styles from "./Exam.module.scss";

const content = {
  firstAttempt: {
    title: "Welcome to Your Final Step!",
    topInfo: (
      <>
        <p className={styles.mainInfo}>
          Congratulations on reaching the final stage of your course! This exam
          is your last step before earning your certificate, a recognition of
          your hard work and dedication to advancing your business knowledge.
        </p>
        <p className={styles.additionInfo}>
          Before you begin, here are a few important points: Review Your
          Progress:
        </p>
        <p className={styles.mainInfo}>
          Review Your Progress: Below, you'll find a summary of your previous
          achievements and progress throughout the course. Take pride in how far
          you've come!
        </p>
      </>
    ),
    bottomInfo: (
      <>
        <p className={styles.mainInfo}>
          <b>Focus and Stay Present</b>: During the exam, it’s essential to
          remain on this page. If you close it or navigate to another window,
          the exam will automatically end, and only the answers submitted so far
          will be recorded.
        </p>
        <p className={styles.mainInfo}>
          <b>Stay Confident</b>: Trust in the knowledge you’ve gained. You've
          prepared well, and we’re rooting for your success! Take a deep breath,
          stay focused, and give it your best. We wish you the very best of
          luck—you're just one step away from achieving your goal!
        </p>
      </>
    ),
  },
};

const ClosedExamPanel = ({ examData, handleStartExam }) => {
  console.log(examData);
  // const maxAttemptsAmount = examData.attempts;
  const studentAttempts = examData.attempts_data;
  // const attemptsLeft = examData.attempts - studentAttempts?.length;

  return (
    <div className={styles.closedExamPanel}>
      <h3 className={styles.title}>{content.firstAttempt.title}</h3>
      <div className={styles.topInfoWrapper}>
        {content.firstAttempt.topInfo}
      </div>
      <div className={styles.stats}></div>
      <div className={styles.bottomInfoWrapper}>
        {content.firstAttempt.bottomInfo}
      </div>
      <button
        className={styles.startBtn}
        onClick={handleStartExam}
        disabled={!(examData.attempts - studentAttempts?.length)}
      >
        <span>Start the exam</span>
      </button>
    </div>
  );
};

export default ClosedExamPanel;
