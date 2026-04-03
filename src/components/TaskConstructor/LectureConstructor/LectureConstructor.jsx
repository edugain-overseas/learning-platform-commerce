import React from "react";
import { motion } from "framer-motion";
import { useLectureConstructor } from "../../../context/LectureConstructorContext";
import { ReactComponent as TrashIcon } from "../../../images/icons/delete.svg";
import { ReactComponent as ArrowIcon } from "../../../images/icons/arrow-left.svg";
import Text from "./parts/Text";
import Present from "./parts/Present";
import Video from "./parts/Video";
import Audio from "./parts/Audio";
import Picture from "./parts/Picture";
import File from "./parts/File";
import Link from "./parts/Link";
import ToolsPanel from "./ToolsPanel";
import Table from "./parts/Table";
import TaskLayout from "../../shared/TaskLayout/TaskLayout";
import styles from "./LectureConstructor.module.scss";

const LectureConstructor = () => {
  const {
    blocks,
    // setBlocks,
    handleAddBlock,
    handleDeleteBlock,
    handleReorder,
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

  console.log(blocks);
  

  return (
    <TaskLayout.Container>
      <TaskLayout.Content>
        {blocks.map((block, index, blocks) => (
          <motion.div
            key={block.id}
            // id={`lecture-block-${block.id}`}
            layout
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.block}
          >
            {getComponent(block)}
            <div className={styles.blockBottomBtns}>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteBlock(block.id)}
              >
                <span>Delete this block</span>
                <TrashIcon />
              </button>
              <div className={styles.reorderBtnsWrapper}>
                {index !== 0 && (
                  <button
                    title="Move up"
                    className={styles.upBtn}
                    onClick={() => handleReorder(index, -1)}
                  >
                    <ArrowIcon />
                  </button>
                )}
                {index !== blocks.length - 1 && (
                  <button
                    title="Move down"
                    className={styles.downBtn}
                    onClick={() => handleReorder(index, 1)}
                  >
                    <ArrowIcon />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </TaskLayout.Content>
      <TaskLayout.Tools>
        <ToolsPanel
          handleAddBlock={handleAddBlock}
          handleSaveLectureParts={handleSaveLectureParts}
        />
      </TaskLayout.Tools>
    </TaskLayout.Container>
  );
};

export default LectureConstructor;
