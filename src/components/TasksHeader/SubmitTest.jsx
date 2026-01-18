import React, { useState } from "react";
import { Empty, Popover } from "antd";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import { useDispatch, useSelector } from "react-redux";
import { submitTestAttemptThunk } from "../../redux/lesson/operation";
import { getUserInfo } from "../../redux/user/selectors";
import { ReactComponent as ComplieteIcon } from "../../images/icons/task-check.svg";
import { ReactComponent as EyeIcon } from "../../images/icons/eye.svg";
import { getTestAttemptById } from "../../http/services/lesson";
import Spinner from "../Spinner/Spinner";
import Modal from "../shared/Modal/Modal";
import TestContent from "../Test/TestContent";
import styles from "./TasksHeader.module.scss";
import "./AntPopoverStyles.css";

const AttemptsList = ({ test, closePopOver }) => {
  const [attemptsDetails, setAttemptsDetails] = useState([]);
  const [selectedAttemptId, setSelectedAttemptId] = useState(null);
  const [isLoadingAttemptId, setIsLoadingAttemptId] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = useNotificationMessage();
  const dispatch = useDispatch();
  const lessonType = test.type;

  const student_id = useSelector(getUserInfo).studentId;

  const attempts = test[`${lessonType}_data`]?.attempts_data;
  const maxScore = test[`${lessonType}_data`]?.score;

  if (!attempts || attempts.length === 0 || !lessonType) {
    return (
      <Empty
        description={
          <span className={styles.emptyDescription}>You have no attempts</span>
        }
      />
    );
  }

  const answers = attemptsDetails.find(
    ({ id }) => id === selectedAttemptId
  )?.data;

  const handleOpenDetails = async (attempt) => {
    setSelectedAttemptId(attempt.id);
    setIsLoadingAttemptId(attempt.id);
    try {
      if (!attemptsDetails.find(({ id }) => id === attempt.id)) {
        const attemptData = await getTestAttemptById(attempt.id, lessonType);
        setAttemptsDetails((prev) => [
          ...prev,
          { id: attempt.id, data: attemptData },
        ]);
      }
      setIsOpenModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingAttemptId(null);
    }
  };

  const handleSubmitAttempt = (attempt_id) => {
    const attemptData = {
      attempt_id,
      lesson_id: test.id,
      student_id,
      lessonType,
    };
    try {
      dispatch(submitTestAttemptThunk(attemptData))
        .unwrap()
        .then((r) => {
          messageApi.success({
            content: r.Message,
            duration: 5,
          });
          closePopOver();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <ul className={styles.attemptsList}>
        {attempts.map((attempt) => (
          <li
            key={attempt.id}
            className={
              test[`${lessonType}_data`]?.my_attempt_id === attempt.id
                ? styles.sumbitedAttempt
                : ""
            }
          >
            <div className={styles.scoreWrapper}>
              <span className={styles.scoreTitle}>Grade</span>
              <span className={styles.scoreData}>
                {`${attempt.attempt_score}`} \ {`${maxScore}`}
              </span>
            </div>
            {isLoadingAttemptId !== attempt.id ? (
              <button
                className={styles.showAttemptDetailBtn}
                onClick={() => handleOpenDetails(attempt)}
              >
                <EyeIcon />
              </button>
            ) : (
              <Spinner color="#001c54" size={6} />
            )}

            {!test[`${lessonType}_data`].my_attempt_id && (
              <button
                className={styles.submitAttemptBtn}
                onClick={() => handleSubmitAttempt(attempt.id)}
                disabled={!attempt.is_passed}
              >
                <span>Submit</span>
                <ComplieteIcon />
              </button>
            )}
          </li>
        ))}
      </ul>
      {answers && (
        <Modal
          width="80%"
          height="80%"
          isOpen={isOpenModal}
          closeModal={() => setIsOpenModal(false)}
        >
          <div className={styles.testContentWrapper}>
            <TestContent test={test} studentAnswers={answers} closed={true} />
          </div>
        </Modal>
      )}
    </>
  );
};

const SubmitTest = ({ test }) => {
  const [isOpen, setIsOpen] = useState(false);

  const lessonType = test.type;

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
  };

  const closePopOver = () => handleOpenChange(false);

  console.log(test);

  const amountOfUserAttempts =
    test[`${lessonType}_data`]?.attempts_data?.length;

  return (
    <Popover
      rootClassName="custom-popover"
      placement="bottomRight"
      zIndex={998}
      title={
        <div className={styles.attemptsTitle}>
          <span>Your attempts:</span>
          {test[`${lessonType}_data`]?.attempts_data && (
            <span
              title={`You can do ${
                test[`${lessonType}_data`].attempts - amountOfUserAttempts
              } attempts more`}
            >{`${amountOfUserAttempts}/${
              test[`${lessonType}_data`].attempts
            }`}</span>
          )}
        </div>
      }
      content={<AttemptsList test={test} closePopOver={closePopOver} />}
      trigger="click"
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <button
        className={`${styles.attemptsBtn} ${
          amountOfUserAttempts !== 0 ? styles.hasAttempts : ""
        }`}
      >
        {test.test_data?.my_score ? (
          <>
            <span>Complete</span>
            <ComplieteIcon />
          </>
        ) : (
          <>
            <span>Attempts</span>
            <ComplieteIcon />
          </>
        )}
      </button>
    </Popover>
  );
};

export default SubmitTest;
