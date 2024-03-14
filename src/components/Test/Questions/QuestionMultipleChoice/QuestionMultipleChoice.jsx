import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import styles from "./QuestionMultipleChoice.module.scss";
import InputCheckbox from "../../../shared/InputCheckbox/InputCheckbox";

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
      <InputCheckbox
        key={answerId}
        value={answerId}
        onChange={onCheckboxInputChange}
        checked={state.includes(answerId)}
        name={answerText}
        labelText={`${getLetterVatiantsByIndex(index)} ${answerText}`}
      />
    ));
  };

  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionMultipleChoice;
