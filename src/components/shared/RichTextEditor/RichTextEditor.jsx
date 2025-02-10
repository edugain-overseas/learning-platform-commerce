import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";
import { stripHtmlTags } from "../../../utils/stripHtmlTags";

const toolbarOptions = [
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
];

const modules = {
  toolbar: toolbarOptions,
};

const RichTextEditor = ({
  value = "",
  setValue = () => null,
  placeholder = "Write your text here...",
  maxLength = null,
}) => {
  const handleChange = (content) => {
    if (maxLength) {
      // const plainText = editor.getText();
      const plainText = stripHtmlTags(content);
      console.log(plainText);

      if (plainText.length > maxLength) {
        setValue(value);
      } else {
        setValue(content);
      }
    } else {
      setValue(content);
    }
  };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      className="richTextEditor"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
