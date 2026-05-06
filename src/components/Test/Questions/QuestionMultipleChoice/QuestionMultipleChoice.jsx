import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import styles from "./QuestionMultipleChoice.module.scss";
import InputCheckbox from "../../../shared/InputCheckbox/InputCheckbox";

const QuestionMultipleChoice = ({ answers, state, setState, id, isPreview }) => {
  const renderAnswers = () => {
    if (!answers) {
      return null;
    }

    return answers.map(({ a_id: answerId, a_text: answerText, is_correct: isCorrect }, index) => {
      const onCheckboxInputChange = () => {
        setState(id, answerId);
      };
      return (
        <InputCheckbox
          key={answerId || index}
          value={answerId || answerText}
          onChange={onCheckboxInputChange}
          checked={isPreview ? isCorrect : state?.includes(answerId)}
          name={answerText}
          labelText={`${getLetterVatiantsByIndex(index)} ${answerText}`}
        />
      );
    });
  };

  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionMultipleChoice;
