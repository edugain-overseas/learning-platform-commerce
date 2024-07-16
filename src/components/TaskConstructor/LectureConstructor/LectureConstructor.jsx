import React, { useState } from "react";
import { lectureParts } from "../../../costants/tasksParts";
import { generateId } from "../../../utils/generateIdBasedOnTime";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import Text from "./parts/Text";
import styles from "./LectureConstructor.module.scss";

const LectureConstructor = () => {
  const [blocks, setBlocks] = useState([]);

  console.log(blocks);

  const handleAddBlock = (part) => {
    setBlocks((prev) => [
      ...prev,
      { id: generateId(), a_type: part.a_type, ...part.template },
    ]);
  };

  const handleDeleteBlock = (partId) => {
    setBlocks((prev) => prev.filter(({ id }) => id !== partId));
  };

  const setTitle = (id, value) =>
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          a_title: value,
        };
      });
    });

  const setText = (id, value) =>
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          a_text: value,
        };
      });
    });

  const getComponent = (block) => {
    switch (block.a_type) {
      case "text":
        const setters = {
          title: (value) => setTitle(block.id, value),
          text: (value) => setText(block.id, value),
        };
        return <Text partData={block} setters={setters} />;
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.blocksWrapper}>
        {blocks.map((block) => (
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

      <div className={styles.toolsWrapper}>
        <ul className={styles.addBlockBtns}>
          {lectureParts.map((part) => (
            <li key={part.a_type}>
              <button onClick={() => handleAddBlock(part)}>
                {part.a_type}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LectureConstructor;
