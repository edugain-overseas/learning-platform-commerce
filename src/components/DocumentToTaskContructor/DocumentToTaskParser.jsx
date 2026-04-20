import React, { useState } from "react";
import ContentBlocks from "./ContentBlocks";
import Tabs from "../Tabs/Tabs";
import ImportForm from "./ImportForm";
import styles from "./DocumentToTaskContructor.module.scss";
import CommonButton from "../shared/CommonButton/CommonButton";
import { useLectureConstructor } from "../../context/LectureConstructorContext";
import { docParserInstance } from "../../http/instance";
import Spinner from "../Spinner/Spinner";

const DocumentToTaskParser = ({ type = "lecture", closeModal }) => {
  const [doc, setDoc] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleAddBlockFromDocImport } = useLectureConstructor();

  const handleUseBlocks = async () => {
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

    setIsLoading(true);
    try {
      const response = await docParserInstance.post("transfer-files", {
        files: pictures,
      });
      const updatedPictures = response.data.files;

      const blocksToUse = lessonBlocks.map((block) => {
        const picture = updatedPictures.find(
          (picture) => picture.a_number === block.a_number
        );

        const formattedText = block.a_text.replace(/\n/g, "<br />");

        if (picture) {
          return {
            ...block,
            a_text: formattedText,
            files: block.files.map((file) => ({
              ...file,
              file_path: picture.file_path,
            })),
          };
        }
        return { ...block, a_text: formattedText };
      });

      console.log("Blocks to use are ");
      console.log(blocksToUse);

      blocksToUse.forEach((block) => handleAddBlockFromDocImport(block));
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ImportForm type={type} setDocument={setDoc} />
        {doc && (
          <CommonButton
            text={isLoading ? "" : "Use for current lesson"}
            icon={isLoading ? <Spinner /> : null}
            disabled={isLoading}
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
