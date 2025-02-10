import React from "react";
import { useLectureConstructor } from "../../../context/LectureConstructorContext";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import Text from "./parts/Text";
import Present from "./parts/Present";
import Video from "./parts/Video";
import Audio from "./parts/Audio";
import Picture from "./parts/Picture";
import File from "./parts/File";
import Link from "./parts/Link";
import ToolsPanel from "./ToolsPanel";
import styles from "./LectureConstructor.module.scss";
import Table from "./parts/Table";

const LectureConstructor = () => {
  const {
    blocks,
    handleAddBlock,
    handleDeleteBlock,
    getSetters,
    handleSaveLectureParts,
  } = useLectureConstructor();

  const getComponent = (block) => {
    const setters = getSetters(block);

    switch (block.a_type) {
      case "text":
        return <Text partData={block} setters={setters} />;
      case "present":
        return <Present partData={block} setters={setters} />;
      case "video":
        return <Video partData={block} setters={setters} />;
      case "audio":
        return <Audio partData={block} setters={setters} />;
      case "picture":
        return <Picture partData={block} setters={setters} />;
      case "file":
        return <File partData={block} setters={setters} />;
      case "link":
        return <Link partData={block} setters={setters} />;
      case "table":
        return <Table partData={block} setters={setters} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.blocksWrapper}>
        {[...blocks]
          .sort((itemA, itemB) => itemA.a_number - itemB.a_number)
          .map((block) => (
            <div key={block.id} className={styles.block}>
              {getComponent(block)}
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteBlock(block.id)}
              >
                <span>Delete this block</span>
                <TrashIcon />
              </button>
            </div>
          ))}
      </div>
      <ToolsPanel
        handleAddBlock={handleAddBlock}
        handleSaveLectureParts={handleSaveLectureParts}
      />
    </div>
  );
};

export default LectureConstructor;
