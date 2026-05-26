// import React, { useMemo } from "react";
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
//         matchers: [["*", clipboardHandler]],
//       },

//       keyboard: {
//         bindings: {
//           shiftEnterInList: {
//             key: 13, // Enter
//             shiftKey: true, // Обов'язково затиснутий Shift
//             format: ["list"], // Тільки всередині списків
//             handler: function (range, context) {
//               // Отримуємо поточний індекс курсору
//               const currentRange = this.quill.getSelection();
//               if (currentRange) {
//                 // Вставляємо символ нового рядка.
//                 // Якщо у тебе підключений quillBreakBlot, Quill автоматично перетворить '\n' у <br> всередині <li>
//                 this.quill.insertText(currentRange.index, "\n", "user");
//                 // Переносимо курсор на один символ вперед (за створений <br>)
//                 this.quill.setSelection(currentRange.index + 1, "user");
//                 return false; // Зупиняємо стандартну поведінку Quill
//               }
//               return true;
//             },
//           },
//         },
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

import React, { useMemo, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import quillModules, {
  clipboardHandler,
} from "../../../costants/reactQuillModules";
import "../../../utils/quillBreakBlot";
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
  // 1. Створюємо ref для доступу до екземпляру Quill
  const quillRef = useRef(null);

  // 2. Вішаємо біндінг напряму через useEffect
  useEffect(() => {
    if (!quillRef.current) return;

    const quill = quillRef.current.getEditor();
    // Отримуємо реальний DOM-вузол, де користувач пише текст
    const editorRoot = quill.root;

    if (editorRoot) {
      console.log(
        "DOM-вузол редактора знайдено. Нативний обробник активовано.",
      );

      const handleKeyDown = (event) => {
        // Перевіряємо, чи натиснуто Enter (keyCode 13) разом із Shift
        if (event.keyCode === 13 && event.shiftKey) {
          const range = quill.getSelection();

          if (range) {
            // Отримуємо поточний рядок (Blot) та його DOM-вузол
            const [lineBlot] = quill.getLine(range.index);

            // Перевіряємо, чи ми всередині тегу LI (списку)
            const isInList =
              lineBlot &&
              (lineBlot.statics.blotName === "list-item" ||
                lineBlot.domNode.tagName === "LI" ||
                lineBlot.domNode.closest("li"));

            if (isInList) {
              // 1. Зупиняємо браузерну подію та внутрішні скрипти Quill
              event.preventDefault();
              event.stopPropagation();

              console.log("Нативний Shift + Enter у списку спрацював!");

              // 2. Вставляємо наш кастомний <br> (break)
              quill.insertEmbed(range.index, "break", true, "user");

              // 3. Пересуваємо курсор на 1 позицію вперед
              quill.setSelection(range.index + 1, "user");
            }
          }
        }
      };

      // Вішаємо слухач подій з прапором 'capture' (true),
      // щоб перехопити подію ДО того, як її забере собі Quill
      editorRoot.addEventListener("keydown", handleKeyDown, true);

      // Прибираємо слухач при розмонтуванні компонента, щоб не було витоку пам'яті
      return () => {
        editorRoot.removeEventListener("keydown", handleKeyDown, true);
      };
    }
  }, []);

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
        }),
      );
    }

    // БЕЗПЕЧНИЙ DOM-BASED МАЧЕР ДЛЯ LI
    const liMatcher = (node, delta) => {
      // Якщо всередині LI немає тегу BR, віддаємо дефолтну дельту, хай Quill парсить сам
      if (!node.querySelector('br')) {
        return delta;
      }

      const Quill = ReactQuill.Quill || window.Quill;
      const Delta = Quill.import('delta');
      const newDelta = new Delta();

      // Проходимо по ВСІХ нативних дочірніх вузлах нашого тегу <li>
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          // Якщо це звичайний текст — просто вставляємо його текст
          const text = child.textContent.replace(/\n/g, '');
          if (text) {
            newDelta.insert(text);
          }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.tagName === 'BR') {
            // Якщо знайшли тег <br> — вставляємо РІВНО ОДИН наш break-блот
            newDelta.insert({ break: true });
          } else {
            // Для будь-яких інших тегів (strong, em, spans, links)
            // Ми беремо їхній текст, зберігаючи жирність/курсив через оригінальну дельту, 
            // або просто вставляємо як текст, щоб уникнути виклику зламаного convert()
            const inlineText = child.textContent.replace(/\n/g, '');
            
            if (inlineText) {
              // Формуємо базові атрибути стилю на основі тегу (опціонально)
              const attrs = {};
              if (child.tagName === 'STRONG' || child.tagName === 'B') attrs.bold = true;
              if (child.tagName === 'EM' || child.tagName === 'I') attrs.italic = true;
              if (child.tagName === 'A') attrs.link = child.getAttribute('href');

              newDelta.insert(inlineText, attrs);
            }
          }
        }
      });

      // Наприкінці кожного LI обов'язково має бути фінальний службовий '\n' з атрибутом списку,
      // щоб Quill розумів, що це саме пункт списку. Копіюємо його з оригінальної дельти.
      const originalLastOp = delta.ops[delta.ops.length - 1];
      if (originalLastOp && originalLastOp.attributes) {
        newDelta.insert('\n', originalLastOp.attributes);
      } else {
        newDelta.insert('\n');
      }

      return newDelta;
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
          ['LI', liMatcher], // Наш виправлений мачер
          ["*", clipboardHandler]
        ],
      },
    };
  }, [type, customTools]);

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
      ref={quillRef} // 3. Передаємо ref у компонент
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
