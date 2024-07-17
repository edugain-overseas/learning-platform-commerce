import React, { useState } from "react";
import { lectureParts } from "../../../costants/tasksParts";
import { generateId } from "../../../utils/generateIdBasedOnTime";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import Text from "./parts/Text";
import styles from "./LectureConstructor.module.scss";
import Present from "./parts/Present";
import Video from "./parts/Video";
import Audio from "./parts/Audio";
import Picture from "./parts/Picture";

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

  const setFilePath = (id, filePath) =>
    setBlocks((prev) => {
      console.log(filePath);
      return prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          file_path: filePath,
        };
      });
    });

  const addNewFile = (id, file) => {
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          files: [
            ...block.files,
            { ...file, file_description: "", download_allowed: false },
          ],
        };
      });
    });
  };

  const deleteFile = (id, filename) => {
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          files: block.files.filter((file) => file.filename !== filename),
        };
      });
    });
  };

  const setDescriptionToFile = (id, filename, value) => {
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          files: block.files.map((file) => {
            if (file.filename === filename) {
              return { ...file, file_description: value };
            }
            return file;
          }),
        };
      });
    });
  };

  const getComponent = (block) => {
    const setters = {
      title: (value) => setTitle(block.id, value),
      text: (value) => setText(block.id, value),
      filePath: (value) => setFilePath(block.id, value),
      addFile: (file) => addNewFile(block.id, file),
      deleteFile: (filename) => deleteFile(block.id, filename),
      setDescription: (filename, value) =>
        setDescriptionToFile(block.id, filename, value),
    };
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
