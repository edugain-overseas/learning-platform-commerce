import React, { useState } from "react";
import { Empty } from "antd";
import QuestionTest from "./Questions/QuestionTest/QuestionTest";
import QuestionMultipleChoice from "./Questions/QuestionMultipleChoice/QuestionMultipleChoice";
import QuestionPhotoAnswers from "./Questions/QuestionPhotoAnswers/QuestionPhotoAnswers";
import QuestionPhoto from "./Questions/QuestionPhoto/QuestionPhoto";
import QuestionMatching from "./Questions/QuestionMatching/QuestionMatching";
import Textarea from "../shared/Textarea/Textarea";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import styles from "./Test.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import { getLessonNumberByType } from "../../utils/getLessonNumberByType";
import CompleteBtn from "../shared/CompleteBtn/CompleteBtn";
import { confirmTestThunk } from "../../redux/lesson/operation";

const TestContent = ({ test }) => {
  const [testTitle, setTestTitle] = useState(test?.title || "");
  const [discription, setDiscription] = useState(test?.description || "");
  const [studentAnswers, setStudentAnswers] = useState([]);
  // const [result, setResult] = useState(null);
  const isEdit = false;

  const dispatch = useDispatch();

  const {
    id: testId,
    course_id: courseId,
    type: lessonType,
    test_data: testData,
  } = test;
  const course = useSelector(getAllCourses)?.find(({ id }) => id === courseId);
  const testContent = [...testData?.questions].sort(
    (itemA, itemB) => itemA.a_number - itemB.a_number
  );
  const courseName = course?.title;
  const courseLessons = course?.lessons;

  const onTitleChange = (value) => {
    const valueWithoutPrefix = value.replace(`${courseName}: `, "");
    setTestTitle(valueWithoutPrefix);
  };

  const onDiscriptionChange = (value) => {
    setDiscription(value);
  };

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
    dispatch(
      confirmTestThunk({ lessonId: testId, studentTest: studentAnswers })
    );
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.testContent}>
        <div className={styles.header}>
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
          {courseLessons && courseLessons.length && (
            <div className={styles.testName}>
              <h2 className={styles.title}>
                <span className={styles.prefix}>Test №:</span>
                {getLessonNumberByType(courseLessons, lessonType, testId)}
              </h2>
            </div>
          )}
          {isEdit ? (
            <Textarea
              className={styles.titleInput}
              fontSize={14}
              value={discription}
              onChange={onDiscriptionChange}
            />
          ) : (
            <div className={styles.testName}>
              <span className={styles.description}>{discription}</span>
            </div>
          )}
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
          <CompleteBtn onClick={handleConfirmTest} />
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
