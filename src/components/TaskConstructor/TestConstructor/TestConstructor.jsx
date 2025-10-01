import React from "react";
import { ReactComponent as TrashIcon } from "../../../images/icons/delete.svg";
import { useTestContructor } from "../../../context/TestContructorContext";
import Test from "./parts/Test";
import Boolean from "./parts/Boolean";
import AnswerWithPhoto from "./parts/AnswerWithPhoto";
import QuestionWithPhoto from "./parts/QuestionWithPhoto";
import MultipleChoice from "./parts/MultipleChoice";
import Matching from "./parts/Matching";
import ToolsPanel from "./ToolsPanel";
import styles from "./TestConstructor.module.scss";
import TaskLayout from "../../shared/TaskLayout/TaskLayout";

const TestConstructor = ({ attempts, score, timer }) => {
  const {
    blocks,
    setNewQuestionProperty,
    addNewOption,
    addNewMatchingPair,
    deleteOption,
    setOptionProperty,
    setCorrectAnswer,
    handleDeleteBlock,
    handleAddBlock,
    changeTestMetaData,
    blocksScore,
    handleSave,
    isLoading,
  } = useTestContructor();

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
        console.log(block);

        return (
          <Matching
            partData={block}
            setters={setters}
            maxScore={maxScore}
            index={index}
            testScore={score}
          />
        );

      default:
        return null;
    }
  };

  return (
    // <div className={styles.wrapper}>
    //   <div className={styles.blocksWrapper}>
    <TaskLayout.Container>
      <TaskLayout.Content>
        {blocks.map((block, index) => (
          <div
            key={block.id || index}
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
      </TaskLayout.Content>
      <TaskLayout.Tools>
        <ToolsPanel
          handleAddBlock={handleAddBlock}
          attempts={attempts}
          score={score}
          timer={timer}
          changeTestMetaData={changeTestMetaData}
          blocksScore={blocksScore}
          handleSaveTestParts={handleSave}
          isLoading={isLoading}
        />
      </TaskLayout.Tools>
    </TaskLayout.Container>
    //   </div>
    // </div>
  );
};

export default TestConstructor;
