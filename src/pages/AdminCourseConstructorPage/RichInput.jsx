import React from "react";
import { useController } from "react-hook-form";
import RichTextEditor from "../../components/shared/RichTextEditor/RichTextEditor";

const RichInput = ({ control, name, placeholder }) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });
  return (
    <RichTextEditor
      value={field.value}
      setValue={field.onChange}
      placeholder={placeholder}
    />
  );
};

export default RichInput;
