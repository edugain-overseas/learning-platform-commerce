import React from "react";
import { ReactComponent as TimeIcon } from "../../images/icons/HomeStats/students.svg";
import { ReactComponent as PointsIcon } from "../../images/icons/HomeStats/courses.svg";
import { ReactComponent as AttemptsIcon } from "../../images/icons/HomeStats/score.svg";
import CommonButton from "../shared/CommonButton/CommonButton";
import styles from "./Test.module.scss";

const TestLanding = ({ onStartTest, completeTestWithAttempt, testData }) => {
  const timer = testData.timer;
  const testScore = testData.score;
  const passingScore = Math.round(testScore * 0.6);
  const testAttemptsLimit = testData.attempts;
  const studentAttemts = testData.attempts_data;
  const attemptsLeft = testAttemptsLimit - studentAttemts.length;
  const studentBestAttempt = studentAttemts.toSorted(
    (a, b) => b.attempt_score - a.attempt_score
  )[0];
  const studentHasPassed = studentBestAttempt?.is_passed;

  return (
    <div className={styles.landingWrapper}>
      <h3>Welcome to Your Assessment</h3>
      <p>
        This test will assess your knowledge based on the lecture material
        you've just studied. All questions are designed to reinforce and
        evaluate your understanding of key concepts.
      </p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <TimeIcon />
          <div className={styles.title}>
            <span>{timer}</span> min
          </div>
          <div className={styles.desc}>
            <b>Time</b> to pass the Test
          </div>
        </div>

        <div className={styles.stat}>
          <PointsIcon />
          <div className={styles.title}>
            <span>{passingScore}</span> points
          </div>
          <div className={styles.desc}>
            <b>Points</b> for passing the Exam
          </div>
        </div>

        <div className={styles.stat}>
          <AttemptsIcon />
          <div className={styles.title}>
            <span>{attemptsLeft}</span> attempts{" "}
            {studentAttemts.length !== 0 && "left"}
          </div>
          <div className={styles.desc}>
            <b>The best</b> result will be upheld.
          </div>
        </div>

        {studentHasPassed && (
          <div className={styles.stat}>
            <PointsIcon />
            <div className={styles.title}>
              <span>{studentBestAttempt.attempt_score}</span> points
            </div>
            <div className={styles.desc}>
              <b>Best</b> attempt scores
            </div>
          </div>
        )}
      </div>

      <p>
        Please read each question carefully and answer to the best of your
        ability. Your results will help track your progress through the course.
      </p>
      <br />
      <p>
        <b>Good luck!</b>
      </p>
      <div className={styles.btnsWrapper}>
        <CommonButton
          text={studentAttemts.length === 0 ? "Start" : "Retake"}
          className={styles.landingBtn}
          variant={
            studentAttemts.length === 0 ? "darkBlue" : "transparentTextDark"
          }
          hoverVariant={
            studentAttemts.length === 0 ? "lightBlue" : "transparentTextLight"
          }
          onClick={onStartTest}
        />
        {studentHasPassed && (
          <CommonButton
            text="Complete"
            variant="green"
            hoverVariant="darkBlue"
            className={styles.landingBtn}
            onClick={() => completeTestWithAttempt(studentBestAttempt.id)}
          />
        )}
      </div>
    </div>
  );
};

export default TestLanding;
