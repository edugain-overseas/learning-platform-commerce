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

// import React, { useMemo, useRef, useEffect } from "react";
// import ReactQuill from "react-quill-new";
// import quillModules, {
//   clipboardHandler,
// } from "../../../costants/reactQuillModules";
// import "../../../utils/quillBreakBlot";
// import "react-quill-new/dist/quill.snow.css";
// import "./RichTextEditor.css";

// const RichTextEditor = ({
//   value = "",
//   setValue = () => null,
//   placeholder = "Write your text here...",
//   type = "expanded",
//   customTools = null,
//   className = "",
//   onBlur,
// }) => {
//   const quillRef = useRef(null);

//   useEffect(() => {
//     if (!quillRef.current) return;

//     const quill = quillRef.current.getEditor();
//     const editorRoot = quill.root;

//     if (editorRoot) {
//       const handleKeyDown = (event) => {
//         if (event.keyCode === 13 && event.shiftKey) {
//           const range = quill.getSelection();

//           if (range) {
//             const [lineBlot] = quill.getLine(range.index);

//             const isInList =
//               lineBlot &&
//               (lineBlot.statics.blotName === "list-item" ||
//                 lineBlot.domNode.tagName === "LI" ||
//                 lineBlot.domNode.closest("li"));

//             if (isInList) {
//               event.preventDefault();
//               event.stopPropagation();

//               quill.insertEmbed(range.index, "break", true, "user");

//               quill.setSelection(range.index + 1, "user");
//             }
//           }
//         }
//       };

//       editorRoot.addEventListener("keydown", handleKeyDown, true);

//       return () => {
//         editorRoot.removeEventListener("keydown", handleKeyDown, true);
//       };
//     }
//   }, []);

//   const modules = useMemo(() => {
//     const container = [...quillModules[type]];
//     const handlers = {
//       undo: function () {
//         this.quill.history.undo();
//       },
//       redo: function () {
//         this.quill.history.redo();
//       },
//     };

//     const isCustomHandlers = Array.isArray(customTools);

//     if (isCustomHandlers) {
//       container.push(
//         customTools.map((tool) => {
//           handlers[tool.name] = tool.handler;
//           return tool.name;
//         }),
//       );
//     }

//     const liMatcher = (node, delta) => {
//       if (!node.querySelector("br")) {
//         return delta;
//       }

//       const Quill = ReactQuill.Quill || window.Quill;
//       const Delta = Quill.import("delta");
//       const newDelta = new Delta();

//       node.childNodes.forEach((child) => {
//         if (child.nodeType === Node.TEXT_NODE) {
//           const text = child.textContent.replace(/\n/g, "");
//           if (text) {
//             newDelta.insert(text);
//           }
//         } else if (child.nodeType === Node.ELEMENT_NODE) {
//           if (child.tagName === "BR") {
//             newDelta.insert({ break: true });
//           } else {
//             const inlineText = child.textContent.replace(/\n/g, "");

//             if (inlineText) {
//               const attrs = {};
//               if (child.tagName === "STRONG" || child.tagName === "B")
//                 attrs.bold = true;
//               if (child.tagName === "EM" || child.tagName === "I")
//                 attrs.italic = true;
//               if (child.tagName === "A")
//                 attrs.link = child.getAttribute("href");

//               newDelta.insert(inlineText, attrs);
//             }
//           }
//         }
//       });

//       const originalLastOp = delta.ops[delta.ops.length - 1];
//       if (originalLastOp && originalLastOp.attributes) {
//         newDelta.insert("\n", originalLastOp.attributes);
//       } else {
//         newDelta.insert("\n");
//       }

//       return newDelta;
//     };

//     return {
//       toolbar: {
//         container,
//         handlers,
//       },

//       history: {
//         delay: 1000,
//         maxStack: 100,
//         userOnly: true,
//       },

//       clipboard: {
//         matchers: [
//           ["LI", liMatcher],
//           ["*", clipboardHandler],
//         ],
//       },
//     };
//     // eslint-disable-next-line
//   }, [type]);

//   const handleChange = (content) => {
//     setValue(content);
//   };

//   const handleBlur = (e, q, r) => {
//     const activeEl = document.activeElement;
//     if (activeEl && activeEl.closest(".ql-toolbar")) {
//       return;
//     }
//     onBlur?.();
//   };

//   return (
//     <ReactQuill
//       ref={quillRef}
//       theme="snow"
//       modules={modules}
//       className={`${
//         type === "tableConstructor" ? "bottomToolbar" : ""
//       } richTextEditor ${className}`}
//       placeholder={placeholder}
//       value={value}
//       onChange={handleChange}
//       onBlur={handleBlur}
//     />
//   );
// };

// export default RichTextEditor;
