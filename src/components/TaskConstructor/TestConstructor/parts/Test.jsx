import React from "react";
import { getLetterVatiantsByIndex } from "../../../../utils/getLetterVatiantsByIndex";
import QuestionInput from "./shared/QuestionInput";
import ScoreInput from "./shared/ScoreInput";
import OptionsWrapper from "./shared/OptionsWrapper";
import Textarea from "../../../shared/Textarea/Textarea";
import DeleteOptionBtn from "./shared/DeleteOptionBtn";
import styles from "../TestConstructor.module.scss";
import InputCheckbox from "../../../shared/InputCheckbox/InputCheckbox";

const Test = ({ partData, setters, maxScore, index }) => {
  return (
    <>
      <ScoreInput
        value={partData.q_score}
        setValue={(value) => setters.setQuestionProperty("q_score", value)}
        maxValue={maxScore}
      />
      <div className={styles.questionWrapper}>
        <span>{`${index + 1})`}</span>
        <QuestionInput
          value={partData.q_text}
          setValue={(value) => setters.setQuestionProperty("q_text", value)}
        />
      </div>
      <OptionsWrapper
        handleAddOption={setters.addOption}
        canAddOption={partData.answers.length < 4}
      >
        {partData.answers.map((answer, index) => (
          <li key={index}>
            <span className={styles.optionLetter}>
              {getLetterVatiantsByIndex(index)}
            </span>
            <Textarea
              value={answer.a_text}
              onChange={(value) =>
                setters.setOptionProperty(index, "a_text", value)
              }
            />
            <InputCheckbox
              className={styles.optionCheckbox}
              checked={answer.is_correct}
              onChange={(e) => {
                setters.setOptionProperty(
                  index,
                  "is_correct",
                  e.target.checked
                );
              }}
            />
            <DeleteOptionBtn
              handleDeleteOption={() => setters.deleteOption(index)}
            />
          </li>
        ))}
      </OptionsWrapper>
    </>
  );
};

export default Test;
