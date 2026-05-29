import React, { useMemo } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import quillModules, {
  clipboardHandler,
} from "../../../costants/reactQuillModules";
import "react-quill-new/dist/quill.snow.css";
import "./RichTextEditor.css";

const Embed = Quill.import("parchment").EmbedBlot;

class SoftLineBreakPlot extends Embed {
  static blotName = "softBreak";
  static tagName = "br";
}
Quill.register(SoftLineBreakPlot);


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
        matchers: [
          ["*", clipboardHandler],
          [
            "BR",
            (node, delta) => {
              const Delta = Quill.import("delta");
              return new Delta().insert({ softBreak: true });
            },
          ],
        ],
      },

      keyboard: {
        bindings: {
          shiftEnterInList: {
            key: "Enter",
            shiftKey: true,
            format: ["list"],
            handler: function (range, context) {
              this.quill.insertEmbed(
                range.index,
                "softBreak",
                true,
                Quill.sources.USER,
              );
              this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
              return false;
            },
          },
        },
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
