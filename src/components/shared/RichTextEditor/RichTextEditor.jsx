import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const toolbarOptions = [
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
];

const tableToolbarOptions = [
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
];

const RichTextEditor = ({
  value = "",
  setValue = () => null,
  placeholder = "Write your text here...",
  type = "normal",
  className = "",
}) => {
  const modules = useMemo(() => {
    return {
      toolbar:
        type === "tableConstructor" ? tableToolbarOptions : toolbarOptions,
      clipboard: {
        matchers: [
          [
            "*",
            (_, delta) => {
              delta.ops.forEach((op) => {
                if (op.attributes) {
                  op.attributes.color = "";
                  op.attributes.background = "";
                }
              });
              return delta;
            },
          ],
        ],
      },
    };
  }, [type]);

  const handleChange = (content) => {
    setValue(content);
  };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      className={`${
        type === "tableConstructor" ? "bottomToolbar" : ""
      } richTextEditor ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
