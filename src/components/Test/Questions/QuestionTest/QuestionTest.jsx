import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import styles from "./QuestionTest.module.scss";
import InputRadio from "../../../shared/InputRadio/InputRadio";

const QuestionTest = ({ answers, state, setState, id, isPreview }) => {
  const onRadioInputChange = (e) => {
    const value = +e.target.value;
    setState(id, value);
  };

  const renderAnswers = () => {
    if (!answers) {
      return;
    }


    return answers.map(
      (
        { a_id: answerId, a_text: answerText, is_correct: isCorrect },
        index
      ) => {        
        return (
          <InputRadio
            key={answerId || index}
            value={answerId || answerText}
            onChange={onRadioInputChange}
            checked={isPreview ? isCorrect : state === answerId}
            name={answerText}
            labelText={`${getLetterVatiantsByIndex(index)} ${answerText}`}
          />
        );
      }
    );
  };
  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionTest;
