import { createContext, useContext, useRef, useState } from "react";
import { handleHighlightSelection } from "../utils/selection";
import { useNotificationMessage } from "../hooks/useNotificationMessage";

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const selectionContaner = useRef();
  const [selectionText, setSelectionText] = useState("");
  const [messageApi, contextHolder] = useNotificationMessage();

  const removeTheSelection = () => {
    const container = selectionContaner.current;

    const selectionElements = container?.querySelectorAll(
      ".highlight-selection"
    );

    if (selectionElements) {
      selectionElements.forEach((selectionElement) => {
        const textContent = selectionElement.innerText;
        const parentNode = selectionElement.parentNode;

        selectionElement.insertAdjacentHTML("beforebegin", textContent);
        parentNode.removeChild(selectionElement);
      });
    }

    setSelectionText("");
  };

  const getSelection = () => {
    const selection = window.getSelection();

    if (!selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const container = selectionContaner.current;

      if (container.contains(range.commonAncestorContainer)) {
        setSelectionText(selection.toString());

        handleHighlightSelection(selection);

        selection.removeAllRanges();
      } else {
        messageApi.info({
          content:
            "Selection is outside the lecture. Please select content inside lecture",
          duration: 3,
        });
      }
    } else {
      messageApi.info({
        content: "No text is selected.",
        duration: 3,
      });
    }
  };

  return (
    <SelectionContext.Provider
      value={{
        selectionContaner,
        selectionText,
        messageApi,
        getSelection,
        removeTheSelection,
      }}
    >
      {contextHolder}
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);
