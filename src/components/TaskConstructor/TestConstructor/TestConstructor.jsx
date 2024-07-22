import React, { useState } from "react";
import { generateId } from "../../../utils/generateIdBasedOnTime";
import { testParts } from "../../../costants/tasksParts";
import { ReactComponent as TrashIcon } from "../../../images/icons/trashRounded.svg";
import styles from "./TestConstructor.module.scss";
import Test from "./parts/Test";
import Boolean from "./parts/Boolean";
import AnswerWithPhoto from "./parts/AnswerWithPhoto";
import QuestionWithPhoto from "./parts/QuestionWithPhoto";
import MultipleChoice from "./parts/MultipleChoice";
import Matching from "./parts/Matching";

const TestConstructor = () => {
  const [blocks, setBlocks] = useState([]);

  console.log(blocks);

  const handleAddBlock = (part) => {
    setBlocks((prev) => [
      ...prev,
      {
        id: generateId(),
        q_type: part.q_type,
        ...part.template,
      },
    ]);
  };

  const handleDeleteBlock = (id) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
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
      }, 40) + block.q_score;

    switch (block.q_type) {
      case "test":
        return (
          <Test
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
          />
        );
      case "boolean":
        return (
          <Boolean
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
          />
        );
      case "answer_with_photo":
        return (
          <AnswerWithPhoto
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
          />
        );
      case "question_with_photo":
        return (
          <QuestionWithPhoto
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
          />
        );
      case "multiple_choice":
        return (
          <MultipleChoice
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
          />
        );
      case "matching":
        return (
          <Matching
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.blocksWrapper}>
        {blocks.map((block, index) => (
          <div key={block.id} className={styles.block}>
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

      <div className={styles.toolsWrapper}>
        <ul className={styles.addBlockBtns}>
          {testParts.map((part) => (
            <li key={`${part.q_type}`}>
              <button onClick={() => handleAddBlock(part)}>{part.label}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestConstructor;
