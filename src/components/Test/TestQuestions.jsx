import React from "react";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";
import QuestionPhoto from "./Questions/QuestionPhoto/QuestionPhoto";
import QuestionPhotoAnswers from "./Questions/QuestionPhotoAnswers/QuestionPhotoAnswers";
import QuestionMultipleChoice from "./Questions/QuestionMultipleChoice/QuestionMultipleChoice";
import styles from "./Test.module.scss";

const TestQuestions = ({ questions, studentAnswers }) => {
  console.log(questions);

  const renderTestContent = () =>
    [...questions]
      .sort((a, b) => a.q_number - b.q_number)
      .map((question, index) => {
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
              <div key={id || index} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}`}</span>
                </div>
                <QuestionTest answers={answers} state={testState} id={id} />
              </div>
            );
          case "multiple_choice":
            const multipleChoiseState = studentAnswers?.find(
              ({ q_id: questionId }) => questionId === id
            )?.a_ids;
            return (
              <div key={id || index} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}`}</span>
                </div>
                <QuestionMultipleChoice
                  answers={answers}
                  state={multipleChoiseState}
                  id={id}
                />
              </div>
            );
          case "answer_with_photo":
            const photoAnswersState = studentAnswers?.find(
              ({ q_id: questionId }) => questionId === id
            )?.a_id;
            return (
              <div key={id || index} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}`}</span>
                </div>
                <QuestionPhotoAnswers
                  answers={answers}
                  state={photoAnswersState}
                  id={id}
                />
              </div>
            );
          case "question_with_photo":
            const photoState = studentAnswers?.find(
              ({ q_id: questionId }) => questionId === id
            )?.a_id;
            return (
              <div key={id || index} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}`}</span>
                </div>
                <QuestionPhoto
                  answers={answers}
                  state={photoState}
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
              <div key={id || index} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span> {text}
                  </p>
                  <span className={styles.score}>{`${score}`}</span>
                </div>
                <QuestionMatching
                  answers={{
                    left: answers[0]?.left,
                    right: answers[0]?.right,
                  }}
                  state={matchingState}
                  id={id}
                />
              </div>
            );
          case "boolean":
            const booleanState = studentAnswers?.find(
              ({ q_id: questionId }) => questionId === id
            )?.a_id;
            return (
              <div key={id || index} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number}) `}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}`}</span>
                </div>
                <QuestionTest answers={answers} state={booleanState} id={id} />
              </div>
            );
          default:
            return null;
        }
      });

  if (!questions) {
    return null;
  }

  return (
    <div style={{ paddingBlock: "12rem", pointerEvents: "none" }}>
      {renderTestContent()}
    </div>
  );
};

export default TestQuestions;
