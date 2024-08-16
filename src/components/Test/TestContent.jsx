import React, { useEffect, useState } from "react";
import { Empty } from "antd";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
import QuestionMultipleChoice from "./Questions/QuestionMultipleChoice/QuestionMultipleChoice";
import QuestionPhotoAnswers from "./Questions/QuestionPhotoAnswers/QuestionPhotoAnswers";
import QuestionPhoto from "./Questions/QuestionPhoto/QuestionPhoto";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import styles from "./Test.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import { getLessonNumberByType } from "../../utils/getLessonNumberByType";
import CompleteBtn from "../shared/CompleteBtn/CompleteBtn";
import { confirmTestThunk } from "../../redux/lesson/operation";
import useMessage from "antd/es/message/useMessage";

const TestContent = ({
  test,
  setStudentAnswersLength = () => {},
  answers = null,
  closed = false,
}) => {
  const [confirmBtnState, setConfirmBtnState] = useState("default");
  const [studentAnswers, setStudentAnswers] = useState(answers ? answers : []);
  const [messageApi, contextHolder] = useMessage();

  const dispatch = useDispatch();

  const {
    id: testId,
    course_id: courseId,
    type: lessonType,
    test_data: testData,
    status,
  } = test;

  const course = useSelector(getAllCourses)?.find(({ id }) => id === courseId);
  const testContent = [...testData?.questions].sort(
    (itemA, itemB) => itemA.a_number - itemB.a_number
  );
  const courseName = course?.title;
  const courseLessons = course?.lessons;

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
            question.matching.find(
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

  const renderTestContent = () =>
    [...testContent]
      .sort((a, b) => a.q_number - b.q_number)
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_id: 0 },
              ]);
            }
            const testState = studentAnswers.find(
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_ids: [] },
              ]);
            }
            const multipleChoiseState = studentAnswers.find(
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_id: 0 },
              ]);
            }
            const photoAnswersState = studentAnswers.find(
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_id: 0 },
              ]);
            }
            const photoState = studentAnswers.find(
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, matching: [] },
              ]);
            }
            const matchingState = studentAnswers.find(
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
            if (
              studentAnswers.find(({ q_id: questionId }) => questionId === id)
            ) {
            } else {
              setStudentAnswers((prev) => [
                ...prev,
                { q_id: id, q_type: type, a_id: 0 },
              ]);
            }
            const booleanState = studentAnswers.find(
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

  const handleConfirmTest = () => {
    setConfirmBtnState("pending");
    dispatch(
      confirmTestThunk({ lessonId: testId, studentTest: studentAnswers })
    )
      .unwrap()
      .then((response) => {
        // setConfirmBtnState("fulfilled");
        setConfirmBtnState("default");
        setStudentAnswers([]);

        messageApi.success({
          content: response.message,
          duration: 5,
        });
      })
      .catch((err) => {
        messageApi.error({
          content: err?.message,
          duration: 3,
        });
      });
  };

  useEffect(() => {
    setStudentAnswersLength(
      studentAnswers.filter((ans) => {
        if (
          ans.q_type === "test" ||
          ans.q_type === "boolean" ||
          ans.q_type === "answer_with_photo" ||
          ans.q_type === "question_with_photo"
        )
          return ans.a_id !== 0;
        if (ans.q_type === "multiple_choice") return ans.a_ids.length !== 0;
        if (ans.q_type === "matching") return ans.matching?.length !== 0;
        return false;
      }).length
    );
    // eslint-disable-next-line
  }, [studentAnswers]);

  useEffect(() => {
    setConfirmBtnState("fulfilled");
  }, [closed]);

  return (
    <>
      {contextHolder}

      <div
        className={styles.contentWrapper}
        style={
          answers
            ? { maxWidth: "100%", pointerEvents: "none" }
            : closed
            ? { pointerEvents: "none" }
            : {}
        }
      >
        <div className={styles.testContent}>
          <div className={styles.header}>
            <div className={styles.testName}>
              <span className={styles.prefix}>{courseName}: </span>
              <span className={styles.title}>
                {test.title ? test.title : ""}
              </span>
            </div>

            {courseLessons && courseLessons.length && (
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
          {!answers && (
            <div className={styles.bottomNavBtnsWrapper}>
              <LessonNavigateBtn
                forward={false}
                currentNumber={test.number}
                label="Return to previous"
                width="200rem"
                height="38rem"
              />
              {(status === "active" || status === "completed") && (
                <CompleteBtn
                  onClick={handleConfirmTest}
                  state={confirmBtnState}
                />
              )}
              <LessonNavigateBtn
                forward={true}
                currentNumber={test.number}
                label="Move on to next"
                width="200rem"
                height="38rem"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TestContent;
