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

  const setNewQuestionText = (id, value) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          q_text: value,
        };
      })
    );
  };

  const setNewScore = (id, value) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== id) return block;
        return {
          ...block,
          q_score: value,
        };
      })
    );
  };

  const getComponent = (block) => {
    const setters = {
      setQuestionText: (value) => setNewQuestionText(block.id, value),
      setScore: (value) => setNewScore(block.id, value),
    };

    const maxScore =
      blocks.reduce((maxScore, block) => {
        return maxScore - block.q_score;
      }, 40) + block.q_score;

    switch (block.q_type) {
      case "test":
        return <Test partData={block} setters={setters} maxScore={maxScore} />;
      case "boolean":
        return (
          <Boolean partData={block} setters={setters} maxScore={maxScore} />
        );
      case "answer_with_photo":
        return (
          <AnswerWithPhoto
            partData={block}
            setters={setters}
            maxScore={maxScore}
          />
        );
      case "question_with_photo":
        return (
          <QuestionWithPhoto
            partData={block}
            setters={setters}
            maxScore={maxScore}
          />
        );
      case "multiple_choice":
        return (
          <MultipleChoice
            partData={block}
            setters={setters}
            maxScore={maxScore}
          />
        );
      case "matching":
        return (
          <Matching partData={block} setters={setters} maxScore={maxScore} />
        );

      default:
        return null;
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
