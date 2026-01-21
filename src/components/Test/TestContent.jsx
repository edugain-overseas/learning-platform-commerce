import React from "react";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import { useInitializeAnswers } from "../../hooks/useInitializeAnswers";
import { getLessonNumberByType } from "../../utils/getLessonNumberByType";
import {
  convertMillisecondsToMinutesAndSeconds,
  minutesToMilliseconds,
} from "../../utils/formatTime";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
import QuestionMultipleChoice from "./Questions/QuestionMultipleChoice/QuestionMultipleChoice";
import QuestionPhotoAnswers from "./Questions/QuestionPhotoAnswers/QuestionPhotoAnswers";
import QuestionPhoto from "./Questions/QuestionPhoto/QuestionPhoto";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";
import styles from "./Test.module.scss";

const TestContent = ({
  studentAnswers = [],
  setStudentAnswers,
  test,
  closed = false,
  timeLeft = null,
  bottomTools,
  maxWidth = "100%",
  wrapperStyles = {},
}) => {
  const { id: testId, course_id: courseId, type: lessonType } = test;

  const course = useSelector(getAllCourses)?.find(({ id }) => id === courseId);
  const courseName = course?.title;
  const courseLessons = course?.lessons;

  const testData = test[`${lessonType}_data`];

  const testContent = [...testData?.questions].sort(
    (itemA, itemB) => itemA.a_number - itemB.a_number
  );

  const showLessonNumber =
    lessonType === "test" && courseLessons && courseLessons.length;

  const setSingleAnswerState = (id, value) => {
    setStudentAnswers((prev) => {
      const updatedState = prev.map((question) => {
        if (question.q_id === id) {
          question.a_id = value;
        }
        return question;
      });
      return updatedState;
    });
  };

  const setMultipleAnswersState = (id, value) => {
    setStudentAnswers((prev) => {
      const updatedState = prev.map((question) => {
        if (question.q_id === id) {
          if (question.a_ids.includes(value)) {
            return {
              ...question,
              a_ids: question.a_ids.filter((v) => v !== value),
            };
          }
          return {
            ...question,
            a_ids: [...question.a_ids, value],
          };
        }
        return question;
      });
      return updatedState;
    });
  };

  const setMatchingState = (id, leftOptionId, value) => {
    setStudentAnswers((prev) => {
      const updatedState = prev.map((question) => {
        if (question.q_id === id) {
          if (
            question.matching?.find(
              ({ left_id: leftId }) => leftId === leftOptionId
            )
          ) {
            question.matching.map((i) => {
              if (i.left_id === leftOptionId) {
                i.right_id = value;
              }
              return i;
            });
          } else {
            question.matching.push({
              left_id: leftOptionId,
              right_id: value,
            });
          }
        }
        return question;
      });
      return updatedState;
    });
  };

  useInitializeAnswers(testData?.questions, setStudentAnswers);

  const renderTestContent = () =>
    testContent.map((question) => {
      const {
        q_id: id,
        q_number: number,
        q_score: score,
        q_text: text,
        q_type: type,
        answers,
        image_path: imagePath,
      } = question;

      switch (type) {
        case "test":
          const testState = studentAnswers?.find(
            ({ q_id: questionId }) => questionId === id
          )?.a_id;
          return (
            <div key={id} className={styles.questionWrapper}>
              <div className={styles.questionHeader}>
                <p className={styles.text}>
                  <span>{`${number}) `}</span>
                  {text}
                </p>
                <span
                  className={styles.score}
                >{`${score}/${testData.score}`}</span>
              </div>
              <QuestionTest
                answers={answers}
                setState={setSingleAnswerState}
                state={testState}
                id={id}
              />
            </div>
          );
        case "multiple_choice":
          const multipleChoiseState = studentAnswers?.find(
            ({ q_id: questionId }) => questionId === id
          )?.a_ids;
          return (
            <div key={id} className={styles.questionWrapper}>
              <div className={styles.questionHeader}>
                <p className={styles.text}>
                  <span>{`${number}) `}</span>
                  {text}
                </p>
                <span
                  className={styles.score}
                >{`${score}/${testData.score}`}</span>
              </div>
              <QuestionMultipleChoice
                answers={answers}
                state={multipleChoiseState}
                setState={setMultipleAnswersState}
                id={id}
              />
            </div>
          );
        case "answer_with_photo":
          const photoAnswersState = studentAnswers?.find(
            ({ q_id: questionId }) => questionId === id
          )?.a_id;
          return (
            <div key={id} className={styles.questionWrapper}>
              <div className={styles.questionHeader}>
                <p className={styles.text}>
                  <span>{`${number}) `}</span>
                  {text}
                </p>
                <span
                  className={styles.score}
                >{`${score}/${testData.score}`}</span>
              </div>
              <QuestionPhotoAnswers
                answers={answers}
                state={photoAnswersState}
                setState={setSingleAnswerState}
                id={id}
              />
            </div>
          );
        case "question_with_photo":
          const photoState = studentAnswers?.find(
            ({ q_id: questionId }) => questionId === id
          )?.a_id;
          return (
            <div key={id} className={styles.questionWrapper}>
              <div className={styles.questionHeader}>
                <p className={styles.text}>
                  <span>{`${number}) `}</span>
                  {text}
                </p>
                <span
                  className={styles.score}
                >{`${score}/${testData.score}`}</span>
              </div>
              <QuestionPhoto
                answers={answers}
                state={photoState}
                setState={setSingleAnswerState}
                id={id}
                imagePath={imagePath}
              />
            </div>
          );
        case "matching":
          const matchingState = studentAnswers?.find(
            ({ q_id }) => q_id === id
          )?.matching;
          return (
            <div key={id} className={styles.questionWrapper}>
              <div className={styles.questionHeader}>
                <p className={styles.text}>
                  <span>{`${number})`}</span> {text}
                </p>
                <span
                  className={styles.score}
                >{`${score}/${testData.score}`}</span>
              </div>
              <QuestionMatching
                answers={{
                  left: answers[0].left,
                  right: answers[0].right,
                }}
                state={matchingState}
                setState={setMatchingState}
                id={id}
              />
            </div>
          );
        case "boolean":
          const booleanState = studentAnswers?.find(
            ({ q_id: questionId }) => questionId === id
          )?.a_id;
          return (
            <div key={id} className={styles.questionWrapper}>
              <div className={styles.questionHeader}>
                <p className={styles.text}>
                  <span>{`${number}) `}</span>
                  {text}
                </p>
                <span
                  className={styles.score}
                >{`${score}/${testData.score}`}</span>
              </div>
              <QuestionTest
                answers={answers}
                state={booleanState}
                setState={setSingleAnswerState}
                id={id}
              />
            </div>
          );
        default:
          return null;
      }
    });

  return (
    <>
      <div
        className={styles.contentWrapper}
        style={{
          pointerEvents: closed ? "none" : "auto",
          opacity: closed ? "0.5" : "1",
          maxWidth: maxWidth,
          ...wrapperStyles,
        }}
      >
        <div className={styles.testContent}>
          <div className={styles.header}>
            <div className={styles.testName}>
              <span className={styles.prefix}>{courseName}: </span>
              <span className={styles.title}>
                {test.title ? test.title : ""}
              </span>
            </div>
            <div className={`${styles.testName} ${styles.examTime}`}>
              {!closed && (
                <>
                  <span className={styles.currentTime}>
                    {`${
                      convertMillisecondsToMinutesAndSeconds(timeLeft).minutes
                    }`.padStart(2, "0") +
                      ":" +
                      `${
                        convertMillisecondsToMinutesAndSeconds(timeLeft).seconds
                      }`.padStart(2, "0")}
                  </span>
                  <span className={styles.divider}>/</span>
                </>
              )}
              <span className={styles.prefix}>
                {`${
                  convertMillisecondsToMinutesAndSeconds(
                    minutesToMilliseconds(test.scheduled_time)
                  ).minutes
                }`.padStart(2, "0") +
                  ":" +
                  `${
                    convertMillisecondsToMinutesAndSeconds(
                      minutesToMilliseconds(test.scheduled_time)
                    ).seconds
                  }`.padStart(2, "0")}
              </span>
            </div>
            {showLessonNumber && (
              <div className={styles.testName}>
                <h2 className={styles.title}>
                  <span className={styles.prefix}>Test №:</span>
                  {getLessonNumberByType(courseLessons, lessonType, testId)}
                </h2>
              </div>
            )}
            <div className={styles.testName}>
              <span className={styles.description}>
                {test.description ? test.description : ""}
              </span>
            </div>
          </div>
          {testContent?.length !== 0 ? renderTestContent() : <Empty />}
          {bottomTools}
        </div>
      </div>
    </>
  );
};

export default TestContent;
