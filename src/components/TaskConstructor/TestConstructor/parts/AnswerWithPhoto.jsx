import React from "react";
import QuestionInput from "./shared/QuestionInput";
import ScoreInput from "./shared/ScoreInput";

const AnswerWithPhoto = ({ partData, setters, maxScore }) => {
  return (
    <>
      <ScoreInput
        value={partData.q_score}
        setValue={(value) => setters.setQuestionProperty("q_score", value)}
        maxValue={maxScore}
      />
      <QuestionInput
        value={partData.q_text}
        setValue={(value) => setters.setQuestionProperty("q_text", value)}
      />
    </>
  );
};

export default AnswerWithPhoto;
