import React from "react";
import RichTextEditor from "../../../../shared/RichTextEditor/RichTextEditor";

const TextInput = ({ value, setValue }) => {
  return (
    <RichTextEditor
      placeholder="Block text"
      value={value}
      setValue={setValue}
    />
  );
};

export default TextInput;
