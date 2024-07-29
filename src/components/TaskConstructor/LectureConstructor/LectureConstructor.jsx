import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllLessons } from "../../../redux/lesson/selectors";
import {
  createLectureAttributesThunk,
  deleteLectureAttributeThunk,
  updateLectureAttributesThunk,
} from "../../../redux/lesson/operation";
import useMessage from "antd/es/message/useMessage";
import { generateId } from "../../../utils/generateIdBasedOnTime";
import { compareLecturePart } from "../../../utils/compareObjectsByKeys";
import { lectureAttributesToBlocks } from "../../../utils/lectureAttributesToBlocks";
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

const LectureConstructor = ({ initialBlocks = [] }) => {
  const [blocks, setBlocks] = useState([
    ...lectureAttributesToBlocks(initialBlocks),
  ]);
  const allLessons = useSelector(getAllLessons);
  const { taskId } = useParams();
  const lectureData = allLessons.find(({ id }) => id === +taskId);
  const lectureId = lectureData?.lecture_info?.lecture_id;
  const lectureAttrMaxNumber = blocks.reduce((maxNum, attr) => {
    return Math.max(attr.a_number, maxNum);
  }, 0);

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = useMessage();

  console.log(blocks);

  const handleAddBlock = (part) => {
    setBlocks((prev) => [
      ...prev,
      {
        id: generateId(),
        a_type: part.a_type,
        a_number: lectureAttrMaxNumber + 1,
        ...part.template,
      },
    ]);
  };

  const handleDeleteBlock = (partId) => {
    setBlocks((prev) =>
      prev.filter((block) => {
        if (block.id === partId && block.a_id) {
          dispatch(
            deleteLectureAttributeThunk({ lectureId, attrId: block.a_id })
          )
            .unwrap()
            .then(() => {
              messageApi.success({
                content: "Lecture part has been deleted",
                duration: 3,
              });
            });
        }
        return block.id !== partId;
      })
    );
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

  const addNewLink = (id) => {
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          links: [...block.links, { link: "", anchor: "" }],
        };
      });
    });
  };

  const deleteLink = (id, linkIndex) => {
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          links: block.links.filter((link, index) => index !== linkIndex),
        };
      });
    });
  };

  const onChangeLinksProperty = (id, linkIndex, property, value) => {
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          links: block.links.map((link, index) => {
            if (index === linkIndex) {
              return { ...link, [property]: value };
            }
            return link;
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

      addLink: () => addNewLink(block.id),
      deleteLink: (link) => deleteLink(block.id, link),

      onChangeLink: (linkIndex, property, value) =>
        onChangeLinksProperty(block.id, linkIndex, property, value),
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
      case "file":
        return <File partData={block} setters={setters} />;
      case "link":
        return <Link partData={block} setters={setters} />;
      default:
        return null;
    }
  };

  const handleSaveLectureParts = () => {
    const newAttrsData = blocks
      .filter((attr) => !attr.a_id)
      .map(({ id, ...rest }) => {
        return { ...rest };
      });

    const initialAttrsData = blocks
      .filter((attr) => attr.a_id)
      .map(({ id, ...rest }) => {
        return { ...rest };
      });

    const initialBlocksToUpdate = initialAttrsData.filter((block) => {
      return compareLecturePart(
        block,
        lectureAttributesToBlocks(initialBlocks).find(
          (initBlock) => initBlock.a_id === block.a_id
        ),
        block.a_type
      );
    });

    console.log(initialBlocksToUpdate);

    if (initialBlocksToUpdate.length) {
      dispatch(
        updateLectureAttributesThunk({
          lectureId,
          attrsData: initialBlocksToUpdate,
        })
      )
        .unwrap()
        .then(() => {
          messageApi.success({
            content: `Lecture part${
              initialBlocksToUpdate.length !== 1 ? "s" : ""
            } ha${
              initialBlocksToUpdate.length !== 1 ? "s" : "ve"
            } been updated`,
            duration: 3,
          });
        });
    }

    if (newAttrsData.length) {
      dispatch(
        createLectureAttributesThunk({ lectureId, attrsData: newAttrsData })
      )
        .unwrap()
        .then((response) => {
          setBlocks((prev) => {
            const blocksWithoutNewBlocks = prev.filter((block) => block.a_id);
            console.log(blocksWithoutNewBlocks);
            return [
              ...blocksWithoutNewBlocks,
              ...lectureAttributesToBlocks(response),
            ];
          });
          messageApi.success({
            content: `Lecture part${
              newAttrsData.length !== 1 ? "s" : ""
            } has been created`,
            duration: 3,
          });
        });
    }
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
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
