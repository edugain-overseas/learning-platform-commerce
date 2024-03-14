import React from "react";
import { Image } from "antd";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import noImage from "../../../../images/noImage.jpeg";
import { serverName } from "../../../../http/sever";
import styles from "./QuestionPhoto.module.scss";
import InputRadio from "../../../shared/InputRadio/InputRadio";

const QuestionPhoto = ({ answers, state, setState, id, imagePath }) => {
  const onRadioInputChange = (e) => {
    const value = +e.target.value;
    setState(id, value);
  };

  console.log(answers);
  const renderAnswers = () => {
    if (!answers) {
      return;
    }

    return answers.map(({ a_id: answerId, a_text: answerText }, index) => {
      console.log(answerText);
      return (
        <InputRadio
          key={answerId}
          value={answerId}
          onChange={onRadioInputChange}
          checked={state === answerId}
          name={answerText}
          labelText={`${getLetterVatiantsByIndex(index)} ${answerText}`}
        />
      );
    });
  };
  return (
    <div className={styles.questionBody}>
      <div className={styles.imageWrapper}>
        <Image
          src={`${serverName}/${imagePath}`}
          fallback={noImage}
          preview={{
            imageRender: (originalNode) => <div className={styles.previewImageWrapper}>{originalNode}</div>,
          }}
        />
      </div>
      <form className={styles.answersWrapper}>{renderAnswers()}</form>
    </div>
  );
};

export default QuestionPhoto;
