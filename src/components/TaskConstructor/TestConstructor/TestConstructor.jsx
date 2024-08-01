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
import { useDispatch, useSelector } from "react-redux";
import {
  createTestAnswerThunk,
  createTestMatchingPairThunk,
  createTestQuestionsThunk,
  deleteTestAnswerThunk,
  deleteTestMatchingPairThunk,
  deleteTestQuestionThunk,
  updateTestAnswerThunk,
  updateTestMatchingPairThunk,
  updateTestMetaDataThunk,
  updateTestQuestionThunk,
} from "../../../redux/lesson/operation";
import {
  compareTestAnswer,
  compareTestQuestion,
} from "../../../utils/compareObjectsByKeys";
import { getIsLoading } from "../../../redux/lesson/selectors";
import { testQuestionsToBlocks } from "../../../utils/testQuestionsToBlocks";

const TestConstructor = ({ attempts, initialBlocks = [], score, testId }) => {
  const [blocks, setBlocks] = useState(testQuestionsToBlocks(initialBlocks));
  const [messageApi, contextHolder] = useMessage();

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);

  const blocksScore = blocks.reduce((score, { q_score }) => score + q_score, 0);

  const testQuestionMaxNumber = blocks.reduce((maxNum, question) => {
    return Math.max(question.q_number, maxNum);
  }, 0);

  console.log(blocks);

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
          return false;
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
            { a_text: "", is_correct: false, image_path: null },
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

        if (block.answers[optionIndex].a_id && block.q_type !== "matching") {
          try {
            dispatch(
              deleteTestAnswerThunk({
                testId,
                answer_id: block.answers[optionIndex].a_id,
              })
            )
              .unwrap()
              .then(() => {
                messageApi.success({
                  content: "Answer has been deleted",
                  duration: 3,
                });
              });
          } catch (error) {
            messageApi.error({
              content: error.message || error.detail.message,
              duration: 3,
            });
            return block;
          }
        }

        if (block.answers[optionIndex].a_id && block.q_type === "matching") {
          try {
            dispatch(
              deleteTestMatchingPairThunk({
                testId,
                left_option_id: block.answers[optionIndex].a_id,
              })
            )
              .unwrap()
              .then(() => {
                messageApi.success({
                  content: "Pair has been deleted",
                  duration: 3,
                });
              });
          } catch (error) {
            messageApi.error({
              content: error.message || error.detail.message,
              duration: 3,
            });
            return block;
          }
        }

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
            testScore={score}
          />
        );

      default:
        return null;
    }
  };

  const handleSave = () => {
    const blocksToCreate = blocks.filter((block) => !block.q_id);

    // Save blocks to create on server
    if (blocksToCreate.length !== 0) {
      try {
        dispatch(
          createTestQuestionsThunk({ testId, questionsData: blocksToCreate })
        )
          .unwrap()
          .then((response) => {
            setBlocks((prev) => {
              const oldBlocks = prev.filter((block) => block.q_id);
              console.log(response);
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
    }

    const blocksToCompare = blocks.filter((block) => block.q_id);

    if (blocksToCompare.length !== 0) {
      const formattedInitialBlocks = testQuestionsToBlocks(initialBlocks);
      blocksToCompare.forEach((block) => {
        const initialBlock = formattedInitialBlocks.find(
          ({ q_id }) => q_id === block.q_id
        );
        if (compareTestQuestion(block, initialBlock)) {
          // update question on server
          const {
            q_id: question_id,
            q_text,
            q_score,
            q_number,
            image_path,
          } = block;

          const questionData =
            block.q_type === "question_with_photo"
              ? { q_text, q_score, q_number, image_path }
              : { q_text, q_score, q_number };

          try {
            dispatch(
              updateTestQuestionThunk({ testId, question_id, questionData })
            )
              .unwrap()
              .then(() => {
                messageApi.success({
                  content: "Question has been updated",
                  duration: 3,
                });
              });
          } catch (error) {
            messageApi.error({
              content: error.message,
              duration: 3,
            });
          }
        }

        const answersToCreate = block.answers.filter((answer) => !answer.a_id);
        if (answersToCreate.length !== 0) {
          // create new answers on server
          answersToCreate.forEach((answer) => {
            if (block.q_type !== "matching") {
              dispatch(
                createTestAnswerThunk({
                  testId,
                  question_id: block.q_id,
                  answerData: answer,
                })
              )
                .unwrap()
                .then((response) => {
                  setBlocks((prev) =>
                    prev.map((question) => {
                      if (question.q_id !== block.q_id) {
                        return question;
                      }
                      const prevAnswers = question.answers.filter(
                        (answer) =>
                          answer.a_text !== response.a_text ||
                          answer.image_path !== response.image_path
                      );
                      return {
                        ...question,
                        answers: [...prevAnswers, response],
                      };
                    })
                  );

                  messageApi.success({
                    content: "Answers has been added",
                    duration: 3,
                  });
                });
            }

            if (block.q_type === "matching") {
              dispatch(
                createTestMatchingPairThunk({
                  testId,
                  question_id: block.q_id,
                  pairData: answer,
                })
              )
                .unwrap()
                .then((response) => {
                  setBlocks((prev) =>
                    prev.map((question) => {
                      if (question.q_id !== block.q_id) {
                        return question;
                      }
                      const prevAnswers = question.answers.filter(
                        (answer) =>
                          answer.left_text !== response.left_text ||
                          answer.right_text !== response.right_text
                      );
                      return {
                        ...question,
                        answers: [
                          ...prevAnswers,
                          {
                            left_text: response.left_text,
                            right_text: response.right_text,
                            a_id: response.left_id,
                          },
                        ],
                      };
                    })
                  );
                  messageApi.success({
                    content: "Pair has been created",
                    duration: 3,
                  });
                });
            }
          });
        }

        const answersToCompare = block.answers.filter((answer) => answer.a_id);

        if (answersToCompare.length !== 0) {
          answersToCompare.forEach((answer) => {
            const initialAnswer = initialBlock.answers.find(
              ({ a_id }) => answer.a_id === a_id
            );
            if (compareTestAnswer(answer, initialAnswer, block.q_type)) {
              // update answer on server
              const { a_id, ...rest } = answer;
              if (block.q_type !== "matching") {
                dispatch(
                  updateTestAnswerThunk({
                    testId,
                    question_id: block.q_id,
                    answer_id: a_id,
                    answerData: rest,
                  })
                )
                  .unwrap()
                  .then(() => {
                    messageApi.success({
                      content: "Answer has been updated",
                      duration: 3,
                    });
                  });
              }
              if (block.q_type === "matching") {
                dispatch(
                  updateTestMatchingPairThunk({
                    testId,
                    question_id: block.q_id,
                    left_option_id: a_id,
                    pairData: rest,
                  })
                )
                  .unwrap()
                  .then(() => {
                    messageApi.success({
                      content: "Pair has been updated",
                      duration: 3,
                    });
                  });
              }
            }
          });
        }
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
        isLoading={isLoading}
      />
    </div>
  );
};

export default TestConstructor;
