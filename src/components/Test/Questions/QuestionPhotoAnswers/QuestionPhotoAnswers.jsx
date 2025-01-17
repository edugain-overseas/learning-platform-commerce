import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import { Image } from "antd";
import { serverName } from "../../../../http/server";
import noImage from "../../../../images/noImage.webp";
import styles from "./QuestionPhotoAnswers.module.scss";
import InputRadio from "../../../shared/InputRadio/InputRadio";

const QuestionPhotoAnswers = ({ answers, state, setState, id }) => {
  const onRadioInputChange = (e) => {
    const value = +e.target.value;
    setState(id, value);
  };

  const renderAnswers = () => {
    if (!answers) {
      return;
    }
    console.log(answers);
    return answers.map(
      (
        { a_id: answerId, a_text: answerText, image_path: imagePath },
        index
      ) => {
        console.log(imagePath);
        return (
          <div key={answerId} className={styles.imageCard}>
            <Image
              src={`${serverName}/${imagePath}`}
              fallback={noImage}
              preview={{
                imageRender: (originalNode) => (
                  <div className={styles.previewImageWrapper}>
                    {originalNode}
                  </div>
                ),
              }}
            />
            <InputRadio
              key={answerId}
              className={styles.input}
              value={answerId}
              onChange={onRadioInputChange}
              checked={state === answerId}
              name={answerText}
              labelText={`${getLetterVatiantsByIndex(index)} ${answerText}`}
            />
          </div>
        );
      }
    );
  };
  return <form className={styles.answersWrapper}>{renderAnswers()}</form>;
};

export default QuestionPhotoAnswers;
