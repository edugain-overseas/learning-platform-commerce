import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import styles from "./QuestionMultipleChoice.module.scss";

const QuestionMultipleChoice = ({ answers, state, setState, id }) => {
  const onCheckboxInputChange = (e) => {
    const value = +e.target.value;
    setState(id, value);
  };

  const renderAnswers = () => {
    if (!answers) {
      return null;
    }

    return answers.map(({ a_id: answerId, a_text: answerText }, index) => (
      <label
        key={answerId}
        className={
          state.includes(answerId)
            ? `${styles.option} ${styles.optionChecked}`
            : styles.option
        }
      >
        <input
          type="checkbox"
          name={`answerText`}
          value={answerId}
          checked={state.includes(answerId)}
          onChange={onCheckboxInputChange}
        />
        {getLetterVatiantsByIndex(index)} {answerText}
      </label>
    ));
  };

  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionMultipleChoice;
