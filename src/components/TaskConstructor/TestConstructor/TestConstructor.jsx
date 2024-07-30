import React, { useState } from "react";
import { generateId } from "../../../utils/generateIdBasedOnTime";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import styles from "./TestConstructor.module.scss";
import Test from "./parts/Test";
import Boolean from "./parts/Boolean";
import AnswerWithPhoto from "./parts/AnswerWithPhoto";
import QuestionWithPhoto from "./parts/QuestionWithPhoto";
import MultipleChoice from "./parts/MultipleChoice";
import Matching from "./parts/Matching";
import ToolsPanel from "./ToolsPanel";
import useMessage from "antd/es/message/useMessage";
import { useDispatch } from "react-redux";
import {
  createTestQuestionsThunk,
  deleteTestQuestionThunk,
  updateTestMetaDataThunk,
} from "../../../redux/lesson/operation";

const TestConstructor = ({ attempts, initialBlocks, score, testId }) => {
  const [blocks, setBlocks] = useState([
    ...initialBlocks.map((block) => ({ ...block, id: block.q_id })),
  ]);
  const [messageApi, contextHolder] = useMessage();

  const dispatch = useDispatch();

  const blocksScore = blocks.reduce((score, { q_score }) => score + q_score, 0);

  const testQuestionMaxNumber = blocks.reduce((maxNum, question) => {
    return Math.max(question.q_number, maxNum);
  }, 0);

  console.log(blocks);

  console.log(score);

  const changeTestMetaData = (newTestMetaData) => {
    return dispatch(
      updateTestMetaDataThunk({
        testId,
        newTestMetaData,
      })
    )
      .unwrap()
      .then(() => {
        messageApi.success({
          content: `Test ${Object.keys(newTestMetaData)[0]} has been updated`,
        });
      });
  };

  const handleAddBlock = (part) => {
    setBlocks((prev) => [
      ...prev,
      {
        id: generateId(),
        q_type: part.q_type,
        q_number: testQuestionMaxNumber + 1,
        ...part.template,
      },
    ]);
  };

  const handleDeleteBlock = (id) => {
    setBlocks((prev) =>
      prev.filter((block) => {
        if (block.id === id) {
          if (block.q_id) {
            try {
              dispatch(
                deleteTestQuestionThunk({ testId, question_id: block.q_id })
              )
                .unwrap()
                .then(() => {
                  messageApi.success({
                    content: "Block has been deleted",
                    duration: 3,
                  });
                });
              return false;
            } catch (error) {
              messageApi.error({
                content: error.message || error.detail.message,
                duration: 3,
              });
              return true;
            }
          }
        }
        return true;
      })
    );
  };

  const setNewQuestionProperty = (id, propertyName, value) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          [propertyName]: value,
        };
      })
    );
  };

  const addNewOption = (id) => {
    setBlocks((prev) =>
      prev.map((block) => {
        console.log(block);
        if (block.id !== id) return block;
        return {
          ...block,
          answers: [
            ...block.answers,
            { a_text: "", is_correct: false, image_path: undefined },
          ],
        };
      })
    );
  };

  const addNewMatchingPair = (id) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          answers: [...block.answers, { right_text: "", left_text: "" }],
        };
      })
    );
  };

  const deleteOption = (id, optionIndex) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          answers: [
            ...block.answers.filter((_, index) => index !== optionIndex),
          ],
        };
      })
    );
  };

  const setOptionProperty = (blockId, optionIndex, propertyName, value) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId) return block;
        return {
          ...block,
          answers: block.answers.map((answer, index) => {
            if (index !== optionIndex) return answer;
            return {
              ...answer,
              [propertyName]: value,
            };
          }),
        };
      })
    );
  };

  const setCorrectAnswer = (blockId, blockType, optionIndex, value) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (blockId !== block.id) return block;
        return {
          ...block,
          answers: block.answers.map((answer, index) => {
            if (blockType === "multiple_choice") {
              if (optionIndex !== index) return answer;
              return { ...answer, is_correct: value };
            } else {
              if (optionIndex === index) {
                return { ...answer, is_correct: value };
              }
              return {
                ...answer,
                is_correct: value === true ? false : answer.is_correct,
              };
            }
          }),
        };
      })
    );
  };

  const getComponent = (block, index) => {
    const setters = {
      setQuestionProperty: (...args) =>
        setNewQuestionProperty(block.id, ...args),
      addOption: () => addNewOption(block.id),
      addMatchingPair: () => addNewMatchingPair(block.id),
      deleteOption: (optionIndex) => deleteOption(block.id, optionIndex),
      setOptionProperty: (...args) => setOptionProperty(block.id, ...args),
      setCorrectAnswer: (...args) =>
        setCorrectAnswer(block.id, block.q_type, ...args),
    };

    const maxScore =
      blocks.reduce((maxScore, block) => {
        return maxScore - block.q_score;
      }, score) + block.q_score;
    switch (block.q_type) {
      case "test":
        return (
          <Test
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
            testScore={score}
          />
        );
      case "boolean":
        return (
          <Boolean
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
            testScore={score}
          />
        );
      case "answer_with_photo":
        return (
          <AnswerWithPhoto
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
            testScore={score}
          />
        );
      case "question_with_photo":
        return (
          <QuestionWithPhoto
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
            testScore={score}
          />
        );
      case "multiple_choice":
        return (
          <MultipleChoice
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
            testScore={score}
          />
        );
      case "matching":
        return (
          <Matching
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
            textScore={score}
          />
        );

      default:
        return null;
    }
  };

  const handleSave = () => {
    const blocksToCreate = blocks.filter((block) => !block.q_id);
    try {
      dispatch(
        createTestQuestionsThunk({ testId, questionsData: blocksToCreate })
      )
        .unwrap()
        .then((response) => {
          setBlocks((prev) => {
            const oldBlocks = prev.filter((block) => block.q_id);
            return [
              ...oldBlocks,
              ...response.map((newBlock) => ({
                ...newBlock,
                id: newBlock.q_id,
              })),
            ];
          });
          messageApi.success({
            content: `Block${blocksToCreate.length !== 1 ? "s" : ""} ha${
              blocksToCreate.length !== 1 ? "ve" : "s"
            } been created`,
            duration: 3,
          });
        });
    } catch (error) {
      messageApi.error({
        content: error.message || error.detail.message,
        duration: 3,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.blocksWrapper}>
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={`${styles.block} ${
              block.q_id ? styles.edit : styles.new
            }`}
          >
            {getComponent(block, index)}
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
        attempts={attempts}
        score={score}
        changeTestMetaData={changeTestMetaData}
        blocksScore={blocksScore}
        handleSaveTestParts={handleSave}
      />
    </div>
  );
};

export default TestConstructor;
