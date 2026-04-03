import React, { useState } from "react";
import TaskLayout from "../shared/TaskLayout/TaskLayout";
import ContentBlocks from "./ContentBlocks";
import Tabs from "../Tabs/Tabs";
import styles from "./DocumentToTaskContructor.module.scss";
import { lecturePartsTemplates } from "../../costants/tasksParts";

const DocumentToTaskContructor = ({ doc }) => {
  const [selectingElement, setSelectingElement] = useState(null);
  const [selectingBlock, setSelectingBlock] = useState(null);
  const [lessonBlocks, setLessonBlocks] = useState([]);

  const handleAddSection = (type) => {
    const lecturePartsTemplatesType = type === "picture" ? "files" : type;

    setSelectingBlock({
      a_type: type,
      a_number: lessonBlocks.length + 1,
      ...lecturePartsTemplates[lecturePartsTemplatesType],
    });
  };

  console.log(selectingBlock);

  const handleSetTitle = (title) => {
    setSelectingElement((prev) => ({ ...prev, a_title: title }));
  };

  const handleAddText = (text) => {
    setSelectingElement((prev) => ({
      ...prev,
      a_text: prev.a_text + `<p>${text}</p>`,
    }));
  };

  const handleSaveSection = () => {};

  console.log(
    handleAddText,
    handleSaveSection,
    handleSetTitle,
    selectingElement,
    setLessonBlocks
  );

  return (
    <TaskLayout.Container className={styles.container}>
      <TaskLayout.Content>
        <Tabs
          items={doc.detail.map((lesson) => ({
            label: lesson.lesson_title,
            key: `${lesson.lesson_number}`,
            children: <ContentBlocks contentBlocks={lesson.content_blocks} />,
          }))}
        />
      </TaskLayout.Content>
      <TaskLayout.Tools title="Tools">
        {!selectingBlock ? (
          <div>
            <button onClick={() => handleAddSection("text")}>Text</button>
            <button onClick={() => handleAddSection("picture")}>Picture</button>
          </div>
        ) : (
          <>
            <div>
              <button onClick={() => setSelectingElement("title")}>
                Title
              </button>
              <button onClick={() => setSelectingElement("text")}>
                Content
              </button>
              <button onClick={() => setSelectingBlock(null)}>Save</button>
              <button onClick={() => setSelectingBlock(null)}>Close</button>
            </div>
          </>
        )}
      </TaskLayout.Tools>
    </TaskLayout.Container>
  );
};

export default DocumentToTaskContructor;
