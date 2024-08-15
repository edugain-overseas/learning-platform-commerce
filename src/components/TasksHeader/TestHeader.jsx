import React from "react";
import { ReactComponent as DocQuestionIcon } from "../../images/icons/document-question.svg";
import CardGrade from "../shared/CardGrade/CardGrade";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import styles from "./TasksHeader.module.scss";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/selectors";
import SumbitTest from "./SumbitTest";

const TestHeader = ({ test, questionsDoneAmount = 0, testScore }) => {
  const { title, type, number, test_data: testData } = test;
  const isModer = useSelector(getUserType) === "moder";

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.divider}>|</span>
        <span className={styles.type}>{type}</span>
      </div>
      <div className={styles.toolsWrapper}>
        {!isModer && (
          <>
            <div className={styles.questionsDoneWrapper}>
              <DocQuestionIcon />
              <span>{`Questions: ${questionsDoneAmount}/${testData?.questions?.length}`}</span>
            </div>
            {testScore ? (
              <CardGrade grade={testScore} maxGrade={testData?.score} />
            ) : (
              <SumbitTest test={test} />
            )}
          </>
        )}
        <div className={styles.navBtnsWrapper}>
          <LessonNavigateBtn forward={false} currentNumber={number} />
          <LessonNavigateBtn forward={true} currentNumber={number} />
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
