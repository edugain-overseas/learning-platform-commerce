import React from "react";
import QuestionInput from "./shared/QuestionInput";
import ScoreInput from "./shared/ScoreInput";
import OptionsWrapper from "./shared/OptionsWrapper";
import Textarea from "../../../shared/Textarea/Textarea";
import DeleteOptionBtn from "./shared/DeleteOptionBtn";
import styles from "../TestConstructor.module.scss";

const Matching = ({ partData, setters, maxScore, index, testScore }) => {
  return (
    <>
      <ScoreInput
        value={partData.q_score}
        setValue={(value) => setters.setQuestionProperty("q_score", value)}
        maxValue={maxScore}
        score={testScore}
      />
      <div className={styles.questionWrapper}>
        <span>{`${index + 1})`}</span>
        <QuestionInput
          value={partData.q_text}
          setValue={(value) => setters.setQuestionProperty("q_text", value)}
        />
      </div>
      <OptionsWrapper
        handleAddOption={setters.addMatchingPair}
        canAddOption={partData.answers.length < 6}
        matching={true}
      >
        {partData.answers.map((answer, index) => (
          <li key={index}>
            <div className={styles.matchingPairWrapper}>
              <Textarea
                placeholder="Please write left part of pair here..."
                value={answer.left_text}
                onChange={(value) =>
                  setters.setOptionProperty(index, "left_text", value)
                }
              />
              <Textarea
                placeholder="Please write right part of pair here..."
                value={answer.right_text}
                onChange={(value) =>
                  setters.setOptionProperty(index, "right_text", value)
                }
              />
            </div>
            <DeleteOptionBtn
              handleDeleteOption={() => setters.deleteOption(index)}
            />
          </li>
        ))}
      </OptionsWrapper>
    </>
  );
};

export default Matching;
