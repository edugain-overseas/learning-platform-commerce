import useMessage from "antd/es/message/useMessage";
import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testQuestionsToBlocks } from "../utils/testQuestionsToBlocks";
import { useParams } from "react-router-dom";
import { getAllLessons, getIsLoading } from "../redux/lesson/selectors";
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
} from "../redux/lesson/operation";
import { generateId } from "../utils/generateIdBasedOnTime";
import {
  compareTestAnswer,
  compareTestQuestion,
} from "../utils/compareObjectsByKeys";

const TestConstructorContext = createContext();

export const useTestContructor = () => useContext(TestConstructorContext);

export const TestContructorProvider = ({ children }) => {
  const { taskId } = useParams();
  const task = useSelector(getAllLessons).find(
    (lesson) => lesson.id === +taskId
  );
  
  console.log(task);

  const lessonType = task.type;
  const initialBlocks = task[`${lessonType}_data`].questions || [];
  const testId = task[`${lessonType}_data`][`${lessonType}_id`];
  console.log(initialBlocks);

  const [blocks, setBlocks] = useState(testQuestionsToBlocks(initialBlocks));
  const [messageApi, contextHolder] = useMessage();

  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);

  const blocksScore = blocks.reduce((score, { q_score }) => score + q_score, 0);

  const testQuestionMaxNumber = blocks.reduce((maxNum, question) => {
    return Math.max(question.q_number, maxNum);
  }, 0);

  const changeTestMetaData = (newTestMetaData) => {
    return dispatch(
      updateTestMetaDataThunk({
        testId,
        newTestMetaData,
        lessonType,
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
                deleteTestQuestionThunk({
                  testId,
                  question_id: block.q_id,
                  lessonType,
                })
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
                lessonType,
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
                lessonType,
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

  const handleSave = () => {
    const blocksToCreate = blocks.filter((block) => !block.q_id);

    // Save blocks to create on server
    if (blocksToCreate.length !== 0) {
      if (blocksToCreate.find((block) => block.q_score === 0)) {
        messageApi.error({
          content: "Question score must be grater then 0",
          duration: 3,
        });
      } else {
        try {
          dispatch(
            createTestQuestionsThunk({
              testId,
              questionsData: blocksToCreate,
              lessonType,
            })
          )
            .unwrap()
            .then((response) => {
              setBlocks((prev) => {
                const oldBlocks = prev.filter((block) => block.q_id);
                const newBlocks = testQuestionsToBlocks(response);
                return [
                  ...oldBlocks,
                  ...newBlocks.map((newBlock) => ({
                    ...newBlock,
                    id: newBlock.q_id,
                  })),
                ];
              });
              messageApi.success({
                content: `Question${blocksToCreate.length !== 1 ? "s" : ""} ha${
                  blocksToCreate.length !== 1 ? "ve" : "s"
                } been created`,
                duration: 3,
              });
            });
        } catch (error) {
          messageApi.error({
            content:
              error.message || error.detail.message || "Something went wrong",
            duration: 3,
          });
        }
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
              updateTestQuestionThunk({
                testId,
                question_id,
                questionData,
                lessonType,
              })
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
                  lessonType,
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
                  lessonType,
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
                    lessonType,
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
                    lessonType,
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
    <TestConstructorContext.Provider
      value={{
        blocks,
        blocksScore,
        isLoading,
        setBlocks,
        setNewQuestionProperty,
        addNewOption,
        addNewMatchingPair,
        deleteOption,
        setOptionProperty,
        setCorrectAnswer,
        handleDeleteBlock,
        handleAddBlock,
        changeTestMetaData,
        handleSave,
      }}
    >
      {contextHolder}
      {children}
    </TestConstructorContext.Provider>
  );
};
