import React from "react";
import { ReactComponent as DocQuestionIcon } from "../../images/icons/document-question.svg";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import styles from "./TasksHeader.module.scss";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/selectors";
import SubmitTest from "./SubmitTest";
import LessonGrade from "../shared/LessonGrade/LessonGrade";

const TestHeader = ({
  test,
  questionsDoneAmount = 0,
  testScore,
  isExam = false,
}) => {
  const { title, type, number, course_id: courseId } = test;

  const testData = isExam ? test.exam_data : test.test_data;
  const isModer = useSelector(getUserType) === "moder";

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.divider}>|</span>
        <span className={styles.type}>{type}</span>
      </div>
      <div className={styles.toolsWrapper}>
        {isModer && (
          <>
            {/* <Template type={isExam ? 'exam' : 'test'} /> */}
            {/* <Switcher
              items={switcherItems}
              value={switcherValue}
              onChange={switcherOnChange}
            /> */}
        </>
        )}
        {!isModer && (
          <>
            {testScore ? (
              <>
                <SubmitTest test={test} />
                <LessonGrade grade={testScore} maxGrade={testData?.score} />
              </>
            ) : (
              <>
                <div className={styles.questionsDoneWrapper}>
                  <DocQuestionIcon />
                  <span>{`Questions: ${questionsDoneAmount}/${testData?.questions?.length}`}</span>
                </div>
                <SubmitTest test={test} />
              </>
            )}
          </>
        )}
        <div className={styles.navBtnsWrapper}>
          <LessonNavigateBtn
            forward={false}
            currentNumber={number}
            courseId={courseId}
          />
          <LessonNavigateBtn
            forward={true}
            currentNumber={number}
            courseId={courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
