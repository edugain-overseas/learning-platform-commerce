import { createContext, useContext } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLectureAttributesThunk,
  deleteLectureAttributeThunk,
  updateLectureAttributesThunk,
} from "../redux/lesson/operation";
import { generateId } from "../utils/generateIdBasedOnTime";
import { compareLecturePart } from "../utils/compareObjectsByKeys";
import { lectureAttributesToBlocks } from "../utils/lectureAttributesToBlocks";
import useMessage from "antd/es/message/useMessage";
import { getAllLessons } from "../redux/lesson/selectors";
import { useParams } from "react-router-dom";

const LectureConstructorContext = createContext();

export const useLectureConstructor = () =>
  useContext(LectureConstructorContext);

export const LectureConstructorProvider = ({ children }) => {
  const { taskId } = useParams();
  const lessons = useSelector(getAllLessons);
  const lectureData = lessons.find(({ id }) => id === +taskId);
  const lectureId = lectureData?.lecture_info?.lecture_id;
  const task = lessons.find(({ id }) => id === +taskId);
  const initialBlocks = task?.lecture_info?.attributes || [];

  const [blocks, setBlocks] = useState([
    ...lectureAttributesToBlocks(initialBlocks),
  ]);

  const lectureAttrMaxNumber = blocks.reduce((maxNum, attr) => {
    return Math.max(attr.a_number, maxNum);
  }, 0);

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = useMessage();

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
          links: block.links.filter((_, index) => index !== linkIndex),
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

  const getSetters = (block) => {
    return {
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
  };

  return (
    <LectureConstructorContext.Provider
      value={{
        blocks,
        handleAddBlock,
        handleDeleteBlock,
        getSetters,
        handleSaveLectureParts,
      }}
    >
      {contextHolder}
      {children}
    </LectureConstructorContext.Provider>
  );
};
