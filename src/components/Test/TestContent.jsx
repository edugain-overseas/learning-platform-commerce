import React, { useState } from "react";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
import QuestionMultipleChoice from "./Questions/QuestionMultipleChoice/QuestionMultipleChoice";
import QuestionPhotoAnswers from "./Questions/QuestionPhotoAnswers/QuestionPhotoAnswers";
import QuestionPhoto from "./Questions/QuestionPhoto/QuestionPhoto";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";
import styles from "./Test.module.scss";
import Textarea from "../shared/Textarea/Textarea";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import { Empty } from "antd";

const TestContent = ({ test }) => {
  const [testTitle, setTestTitle] = useState(test?.title || "");
  const [studentAnswers, setStudentAnswers] = useState([]);
  // const [result, setResult] = useState(null);
  const isEdit = false;

  const { lessonId: testId } = test;

  const testContent = [...test.content].sort(
    (itemA, itemB) => itemA.a_number - itemB.a_number
  );

  const courseName = "Marketing";

  const onTitleChange = (value) => {
    console.log(value);
    const valueWithoutPrefix = value.replace(`${courseName}: `, "");
    setTestTitle(valueWithoutPrefix);
  };

  const setSingleAnswerState = (id, value) => {
    setStudentAnswers((prev) => {
      const updatedState = prev.map((question) => {
        if (question.questionId === id) {
          question.answerId = value;
        }
        return question;
      });
      return updatedState;
    });
  };

  const setMultipleAnswersState = (id, value) => {
    setStudentAnswers((prev) => {
      console.log(prev);
      const updatedState = prev.map((question) => {
        if (question.questionId === id) {
          if (question.answersIds.includes(value)) {
            return {
              ...question,
              answersIds: question.answersIds.filter((v) => v !== value),
            };
          }
          return {
            ...question,
            answersIds: [...question.answersIds, value],
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
        if (question.questionId === id) {
          if (
            question.matching.find(
              ({ leftOptionId: leftId }) => leftId === leftOptionId
            )
          ) {
            question.matching.map((i) => {
              if (i.leftOptionId === leftOptionId) {
                i.rightOptionId = value;
              }
              return i;
            });
          } else {
            question.matching.push({
              leftOptionId: leftOptionId,
              rightOptionId: value,
            });
          }
        }
        return question;
      });
      return updatedState;
    });
  };

  const renderTestContent = () =>
    [...testContent]
      .sort((itemA, itemB) => itemA.questionNumber - itemB.questionNumber)
      .map((question) => {
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
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answerId: 0 },
              ]);
            }
            const testState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answerId;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
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
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answersIds: [] },
              ]);
            }
            const multipleChoiseState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answersIds;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
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
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answerId: 0 },
              ]);
            }
            const photoAnswersState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answerId;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
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
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answerId: 0 },
              ]);
            }
            const photoState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answerId;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
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
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, matching: [] },
              ]);
            }
            const matchingState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.matching;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
                </div>
                <QuestionMatching
                  answers={{
                    left: answers.left,
                    right: answers.right,
                  }}
                  state={matchingState}
                  setState={setMatchingState}
                  id={id}
                />
              </div>
            );
          case "boolean":
            if (studentAnswers.find(({ questionId }) => questionId === id)) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { questionId: id, questionType: type, answerId: 0 },
              ]);
            }
            const booleanState = studentAnswers.find(
              ({ questionId }) => questionId === id
            )?.answerId;
            return (
              <div key={id} className={styles.questionWrapper}>
                <div className={styles.questionHeader}>
                  <p className={styles.text}>
                    <span>{`${number})`}</span>
                    {text}
                  </p>
                  <span className={styles.score}>{`${score}/200`}</span>
                </div>
                <QuestionTest
                  answers={answers}
                  // answers={shuffleArray([...answers])}
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
    <div className={styles.contentWrapper}>
      <div className={styles.testContent}>
        <div className={styles.titleWrapper}>
          {isEdit ? (
            <Textarea
              className={styles.titleInput}
              fontSize={18}
              value={`${courseName}: ${testTitle}`}
              onChange={onTitleChange}
              prefixStr={`${courseName}: `}
            />
          ) : (
            <div className={styles.testName}>
              <span className={styles.prefix}>{courseName}: </span>
              <span className={styles.title}>{testTitle}</span>
            </div>
          )}
          <h2 className={styles.title}>
            <span className={styles.prefix}>Test №:</span>
            {testId}
          </h2>
        </div>
        {isEdit ? (
          //   <LectureConstructor
          //     lectureId={lectureId}
          //     lectureContent={lectureContent.map((item) => ({
          //       ...item,
          //       id: item.attributeId,
          //     }))}
          //   />
          <div></div>
        ) : testContent?.length !== 0 ? (
          renderTestContent()
        ) : (
          <Empty />
        )}
        <div className={styles.bottomNavBtnsWrapper}>
          <LessonNavigateBtn
            forward={false}
            currentNumber={test.number}
            label="Return to previous"
            width="200rem"
            height="38rem"
          />
          <LessonNavigateBtn
            forward={true}
            currentNumber={test.number}
            label="Move on to next"
            width="200rem"
            height="38rem"
          />
        </div>
      </div>
    </div>
  );
};

export default TestContent;
