import React from "react";
import styles from "./Test.module.scss";

const TestLanding = ({ onStartTest, testData }) => {
  return (
    <div className={styles.landingWrapper}>
      <h3>Welcome to Your Assessment</h3>
      <p>
        This test will assess your knowledge based on the lecture material
        you've just studied. All questions are designed to reinforce and
        evaluate your understanding of key concepts.
      </p>
      <br />
      <br />
      <p>
        <b>🕒 Time Limit: {testData.timer} minutes</b>
      </p>
      <br />
      <p>
        <b>🎯 Passing Score: {Math.round(testData.score * 0.6)}</b>
      </p>
      <br />
      <br />
      <p>
        Please read each question carefully and answer to the best of your
        ability. Your results will help track your progress through the course.
      </p>
      <br />
      <p>
        <b>Good luck!</b>
      </p>
      <button onClick={onStartTest} className={styles.landingBtn}>Start</button>
    </div>
  );
};

export default TestLanding;
