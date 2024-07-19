import React from "react";
import QuestionInput from "./shared/QuestionInput";
import ScoreInput from "./shared/ScoreInput";

const QuestionWithPhoto = ({ partData, setters, maxScore }) => {
  return (
    <>
      <ScoreInput
        value={partData.q_score}
        setValue={setters.setScore}
        maxValue={maxScore}
      />
      <QuestionInput
        value={partData.q_text}
        setValue={setters.setQuestionText}
      />
    </>
  );
};

export default QuestionWithPhoto;
