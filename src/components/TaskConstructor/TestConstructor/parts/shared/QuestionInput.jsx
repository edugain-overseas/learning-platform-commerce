import React from "react";
import Textarea from "../../../../shared/Textarea/Textarea";

const QuestionInput = ({ value, setValue }) => {
  return (
    <Textarea
      value={value}
      onChange={setValue}
      fontSize={16}
      minRows={2}
      maxRows={4}
      placeholder="Write your question here..."
    />
  );
};

export default QuestionInput;
