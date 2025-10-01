import React, { useMemo } from "react";
import ReactQuill from "react-quill-new";
import quillModules, {
  clipboardHandler,
} from "../../../costants/reactQuillModules";
import "react-quill-new/dist/quill.snow.css";
import "./RichTextEditor.css";

const RichTextEditor = ({
  value = "",
  setValue = () => null,
  placeholder = "Write your text here...",
  type = "expanded",
  customTools = null,
  className = "",
  onBlur,
}) => {
  const modules = useMemo(() => {
    const container = [...quillModules[type]];
    const handlers = {
      undo: function () {
        this.quill.history.undo();
      },
      redo: function () {
        this.quill.history.redo();
      },
    };

    const isCustomHandlers = Array.isArray(customTools);

    if (isCustomHandlers) {
      container.push(
        customTools.map((tool) => {
          handlers[tool.name] = tool.handler;
          return tool.name;
        })
      );
    }

    return {
      toolbar: {
        container,
        handlers,
      },
      history: {
        delay: 1000,
        maxStack: 100,
        userOnly: true,
      },
      clipboard: {
        matchers: [["*", clipboardHandler]],
      },
    };
    // eslint-disable-next-line
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
