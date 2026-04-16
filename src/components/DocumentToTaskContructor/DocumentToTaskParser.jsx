import React, { useState } from "react";
import ContentBlocks from "./ContentBlocks";
import Tabs from "../Tabs/Tabs";
import ImportForm from "./ImportForm";
import styles from "./DocumentToTaskContructor.module.scss";
import CommonButton from "../shared/CommonButton/CommonButton";
import { useLectureConstructor } from "../../context/LectureConstructorContext";

const DocumentToTaskParser = ({ type = "lectures", closeModal }) => {
  const [doc, setDoc] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  const { handleAddBlockFromDocImport } = useLectureConstructor();

  const handleUseBlocks = () => {
    console.log("Active tab is " + activeTab);

    const activeTabLesson = activeTab
      ? doc.lectures.find((lesson) => lesson.lesson_title === activeTab)
      : doc.lectures[0];

    const lessonBlocks = activeTabLesson.blocks;

    const pictures = lessonBlocks.reduce((pictures, block) => {
      if (block.a_type === "picture") {
        return [
          ...pictures,
          { a_number: block.a_number, file_path: block.files[0].file_path },
        ];
      }
      return pictures;
    }, []);

    // Add pictures transfering to base server by http request and get new file_path for each picture

    const blocksToUse = lessonBlocks.map((block) => {
      const picture = pictures.find(
        (picture) => picture.a_number === block.a_number
      );

      if (picture) {
        return {
          ...block,
          files: block.files.map((file) => ({
            ...file,
            file_path: picture.file_path,
          })),
        };
      }
      return block;
    });

    console.log("Blocks to use are ");
    console.log(blocksToUse);

    blocksToUse.forEach((block) => handleAddBlockFromDocImport(block));
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ImportForm type={type} setDocument={setDoc} />
        {doc && (
          <CommonButton
            text="Use for current lesson"
            className={styles.useBtn}
            variant="darkBlue"
            hoverVariant="green"
            onClick={handleUseBlocks}
          />
        )}
      </div>
      {doc && (
        <Tabs
          onChange={(newActiveTab) => setActiveTab(newActiveTab)}
          items={doc.lectures.map((lesson) => ({
            label: lesson.lesson_title,
            key: `${lesson.lesson_title}`,
            children: <ContentBlocks blocks={lesson.blocks} />,
          }))}
        />
      )}
    </div>
  );
};

export default DocumentToTaskParser;
