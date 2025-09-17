import React, { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./RichTextEditor.css";

const toolbarOptions = [
  ["undo", "redo"],
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline", { list: "ordered" }, { list: "bullet" }, { align: [] }],
];

const tableToolbarOptions = [
  ["undo", "redo"],
  ["bold", "italic", "underline", { list: "ordered" }, { list: "bullet" }, { align: [] }],
];

const RichTextEditor = ({
  value = "",
  setValue = () => null,
  placeholder = "Write your text here...",
  type = "normal",
  className = "",
}) => {
  // const modules = useMemo(() => {
  //   return {
  //     toolbar:
  //       type === "tableConstructor" ? tableToolbarOptions : toolbarOptions,
  //     clipboard: {
  //       matchers: [
  //         [
  //           "*",
  //           (_, delta) => {
  //             delta.ops.forEach((op) => {
  //               if (op.attributes) {
  //                 op.attributes.color = "";
  //                 op.attributes.background = "";
  //               }
  //             });
  //             return delta;
  //           },
  //         ],
  //       ],
  //     },
  //   };
  // }, [type]);

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
