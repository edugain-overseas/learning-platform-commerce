import React, { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./RichTextEditor.css";

const toolbarOptions = [
  ["undo", "redo"],
  [{ header: [1, 2, false] }],
  [
    "bold",
    "italic",
    "underline",
    { list: "ordered" },
    { list: "bullet" },
    { align: [] },
  ],
];

const tableToolbarOptions = [
  ["undo", "redo"],
  [
    "bold",
    "italic",
    "underline",
    { list: "ordered" },
    { list: "bullet" },
    { align: [] },
  ],
];

const RichTextEditor = ({
  value = "",
  setValue = () => null,
  placeholder = "Write your text here...",
  type = "normal",
  className = "",
  onBlur,
}) => {

  const modules = useMemo(() => {
    return {
      toolbar: {
        container:
          type === "tableConstructor" ? tableToolbarOptions : toolbarOptions,
        handlers: {
          undo: function () {
            this.quill.history.undo();
          },
          redo: function () {
            this.quill.history.redo();
          },
        },
      },
      history: {
        delay: 1000,
        maxStack: 100,
        userOnly: true,
      },
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

  const handleBlur = (e, q, r) => {
    const activeEl = document.activeElement;
    if (activeEl && activeEl.closest(".ql-toolbar")) {
      return;
    }
    onBlur?.();
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
      onBlur={handleBlur}
    />
  );
};

export default RichTextEditor;
