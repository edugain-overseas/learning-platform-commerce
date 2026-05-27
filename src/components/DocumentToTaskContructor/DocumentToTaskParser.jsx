import React, { useMemo, useState } from "react";
import ContentBlocks from "./ContentBlocks";
import Tabs from "../Tabs/Tabs";
import ImportForm from "./ImportForm";
import styles from "./DocumentToTaskContructor.module.scss";
import CommonButton from "../shared/CommonButton/CommonButton";
import { useLectureConstructor } from "../../context/LectureConstructorContext";
import { docParserInstance } from "../../http/instance";
import Spinner from "../Spinner/Spinner";
import { useTestContructor } from "../../context/TestContructorContext";
import { useDocCache } from "../../hooks/useDocCache";

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

  const cacheInterface = useDocCache();
  const cachedItems = cacheInterface.getCacheListByType(type);

  const lectureConstructorInterface = useLectureConstructor();
  const testConstructorInterface = useTestContructor();

  const handleAddBlockFromDocImport =
    type === "lecture"
      ? lectureConstructorInterface.handleAddBlockFromDocImport
      : testConstructorInterface.handleAddBlockFromDocImport;

  const isDocValid = useMemo(() => {
    if (!doc) return false;

    const items = doc[DOCKEYBYTYPE[type]];
    if (!Array.isArray(items) || items.length === 0) return false;

    if (activeTab) {
      const currentTitleKey = DOCTITLEKEYBYTYPE[type];
      const tabExists = items.some(
        (item) => item[currentTitleKey] === activeTab,
      );
      if (!tabExists) return false;
    }

    return true;
  }, [doc, type, activeTab]);

  const handleUseLectureBlocks = async () => {
    console.log("Active tab is " + activeTab);

    const activeTabLesson = activeTab
      ? doc.lectures.find((lesson) => lesson.lesson_title === activeTab)
      : doc.lectures[0];

    const lessonBlocks = activeTabLesson?.blocks;

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
          (picture) => picture.a_number === block.a_number,
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

    closeModal();
  };

  const isUseButtonDisabled = isLoading || !isDocValid;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ImportForm
          type={type}
          setDocument={setDoc}
          cacheInterface={cacheInterface}
        />
        {doc && (
          <CommonButton
            text={isLoading ? "" : "Use for current lesson"}
            icon={isLoading ? <Spinner /> : null}
            disabled={isUseButtonDisabled}
            className={styles.useBtn}
            variant="darkBlue"
            hoverVariant="green"
            onClick={
              type === "lecture" ? handleUseLectureBlocks : handleUseTestBlocks
            }
          />
        )}
      </div>
      {cachedItems.length > 0 && (
        <div className={styles.cacheHistorySection}>
          <h3 className={styles.cacheHistoryTitle}>
            Parsed Documents History ({type}s)
          </h3>
          <ul className={styles.cacheList}>
            {cachedItems.map((item) => (
              <li key={`${item.type}_${item.url}`} className={styles.cacheItem}>
                <div
                  className={styles.cacheInfo}
                  onClick={() => {
                    setDoc(item.response);
                    setActiveTab(null); // скидаємо таб при перемиканні документа
                  }}
                  title="Click to quickly load this document from cache"
                >
                  <span className={styles.cacheTypeBadge}>{item.type}</span>
                  <span className={styles.cacheTitle}>{item.title}</span>
                  <span className={styles.cacheUrl}>{item.url}</span>
                </div>
                <button
                  className={styles.deleteCacheBtn}
                  onClick={() =>
                    cacheInterface.removeFromCache(item.url, item.type)
                  }
                  title="Delete from cache"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            className={styles.clearAllBtn}
            onClick={cacheInterface.clearAllCache}
          >
            Clear History Cache
          </button>
        </div>
      )}
      {doc && isDocValid && (
        <Tabs
          onChange={(newActiveTab) => setActiveTab(newActiveTab)}
          items={doc?.[DOCKEYBYTYPE[type]]?.map((lesson) => ({
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
