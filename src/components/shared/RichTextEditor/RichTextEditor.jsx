import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

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
}) => {
  console.log(value);
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      className="richTextEditor"
      placeholder={placeholder}
      value={value}
      onChange={setValue}
    />
  );
};

export default RichTextEditor;
