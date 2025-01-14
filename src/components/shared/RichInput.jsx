import React from "react";
import { useController } from "react-hook-form";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

const RichInput = ({ control, name, placeholder, maxLength = null }) => {
  const { field } = useController({
    name,
    control,
    rules: {
      required: true,
      message: "This field is required",
    },
  });
  return (
    <RichTextEditor
      value={field.value}
      setValue={field.onChange}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};

export default RichInput;
