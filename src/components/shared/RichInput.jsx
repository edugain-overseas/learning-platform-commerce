import React from "react";
import { useController } from "react-hook-form";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

const RichInput = ({ control, name, placeholder, maxLength = null, toolbarType }) => {
  const { field } = useController({
    name,
    control,
  });  

  return (
    <RichTextEditor
      value={field.value}
      setValue={field.onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      type={toolbarType}
    />
  );
};

export default RichInput;
