import React, { useState } from "react";
import ContentBlocks from "./ContentBlocks";
import Tabs from "../Tabs/Tabs";
import ImportForm from "./ImportForm";
import styles from "./DocumentToTaskContructor.module.scss";
import CommonButton from "../shared/CommonButton/CommonButton";
import { useLectureConstructor } from "../../context/LectureConstructorContext";
import { docParserInstance } from "../../http/instance";
import Spinner from "../Spinner/Spinner";
import { useTestContructor } from "../../context/TestContructorContext";

const DOCKEYBYTYPE = {
  lecture: "lectures",
  test: "tests",
};

const DOCTITLEKEYBYTYPE = {
  lecture: "lesson_title",
  test: "title",
};

const DOCBLOCKSKEYBYTYPE = {
  lecture: "blocks",
  test: "test_data",
};

const DocumentToTaskParser = ({ type = "lecture", closeModal }) => {
  const [doc, setDoc] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const lectureConstructorInterface = useLectureConstructor();
  const testConstructorInterface = useTestContructor();

  const handleAddBlockFromDocImport =
    type === "lecture"
      ? lectureConstructorInterface.handleAddBlockFromDocImport
      : testConstructorInterface.handleAddBlockFromDocImport;

  const handleUseLectureBlocks = async () => {
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

      blocksToUse.forEach((block) => handleAddBlockFromDocImport(block));
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseTestBlocks = async () => {
    const activeTabLesson = activeTab
      ? doc.tests.find((lesson) => lesson.title === activeTab)
      : doc.tests[0];

    console.log(activeTabLesson);

    const questions = activeTabLesson.test_data;

    questions.forEach((question) => handleAddBlockFromDocImport(question));

    closeModal()

    // [
    //   {
    //     id: "1778063768142",
    //     q_type: "test",
    //     q_number: 1,
    //     q_text: "",
    //     q_score: 2,
    //     hedden: false,
    //     answers: [
    //       {
    //         a_text: "",
    //         is_correct: false,
    //         image_path: null,
    //       },
    //       {
    //         a_text: "",
    //         is_correct: false,
    //         image_path: null,
    //       },
    //       {
    //         a_text: "",
    //         is_correct: true,
    //         image_path: null,
    //       },
    //       {
    //         a_text: "",
    //         is_correct: false,
    //         image_path: null,
    //       },
    //     ],
    //   },
    //   {
    //     id: "1778063969666",
    //     q_type: "boolean",
    //     q_number: 2,
    //     q_text: "",
    //     q_score: 0,
    //     hedden: false,
    //     answers: [
    //       {
    //         a_text: "true",
    //         is_correct: true,
    //       },
    //       {
    //         a_text: "false",
    //         is_correct: false,
    //       },
    //     ],
    //   },
    // ];
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
            onClick={
              type === "lecture" ? handleUseLectureBlocks : handleUseTestBlocks
            }
          />
        )}
      </div>
      {doc && (
        <Tabs
          onChange={(newActiveTab) => setActiveTab(newActiveTab)}
          items={doc?.[DOCKEYBYTYPE[type]].map((lesson) => ({
            label: lesson[DOCTITLEKEYBYTYPE[type]],
            key: `${lesson[DOCTITLEKEYBYTYPE[type]]}`,
            children: (
              <ContentBlocks
                blocks={lesson[DOCBLOCKSKEYBYTYPE[type]]}
                type={type}
                config={{ score: lesson.max_score }}
              />
            ),
          }))}
        />
      )}
    </div>
  );
};

export default DocumentToTaskParser;
