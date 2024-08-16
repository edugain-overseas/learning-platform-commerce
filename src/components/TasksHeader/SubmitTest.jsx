import React, { useState } from "react";
import { Popover } from "antd";
import { ReactComponent as ListIcon } from "../../images/icons/list.svg";
import { ReactComponent as ComplieteIcon } from "../../images/icons/task-check.svg";
import { ReactComponent as EyeIcon } from "../../images/icons/eye.svg";
import styles from "./TasksHeader.module.scss";
import { getTestAttemptById } from "../../http/services/lesson";
import Spinner from "../Spinner/Spinner";
import Modal from "../shared/Modal/Modal";
import TestContent from "../Test/TestContent";
import "./AntPopoverStyles.css";

const AttemptsList = ({ test }) => {
  const [attemptsDetails, setAttemptsDetails] = useState([]);
  const [selectedAttemptId, setSelectedAttemptId] = useState(null);
  const [isLoadingAttemptId, setIsLoadingAttemptId] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const attempts = test.test_data.attempts_data;
  const maxScore = test.test_data.score;

  if (!attempts || attempts.length === 0) {
    return null;
  }

  const answers = attemptsDetails.find(
    ({ id }) => id === selectedAttemptId
  )?.data;


  const handleOpenDetails = async (attempt) => {
    setSelectedAttemptId(attempt.id);
    setIsLoadingAttemptId(attempt.id);
    try {
      if (!attemptsDetails.find(({ id }) => id === attempt.id)) {
        const attemptData = await getTestAttemptById(attempt.id);
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

  return (
    <>
      <ul className={styles.attemptsList}>
        {attempts.map((attempt) => (
          <li key={attempt.id}>
            <span
              className={styles.marker}
            >{`${attempt.attempt_number})`}</span>
            <span
              className={styles.scoreData}
            >{`${attempt.attempt_score}/${maxScore}`}</span>
            <button
              className={styles.showAttemptDetailBtn}
              onClick={() => handleOpenDetails(attempt)}
            >
              {isLoadingAttemptId !== attempt.id ? (
                <>
                  <EyeIcon />
                  <span>Show details</span>
                </>
              ) : (
                <Spinner />
              )}
            </button>
            <button className={styles.submitAttemptBtn}>
              <span>Submit</span>
              <ComplieteIcon />
            </button>
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
            <TestContent test={test} answers={answers} />
          </div>
        </Modal>
      )}
    </>
  );
};

const SubmitTest = ({ test }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
  };

  return (
    <Popover
      rootClassName="custom-popover"
      placement="bottomRight"
      zIndex={998}
      title={
        <div className={styles.attemptsTitle}>
          <span>Your attempts:</span>
          {test.test_data.attempts_data && (
            <span
              title={`You can do ${
                test.test_data.attempts - test.test_data.attempts_data.length
              } attempts more`}
            >{`${test.test_data.attempts_data.length}/${test.test_data.attempts}`}</span>
          )}
        </div>
      }
      content={
        <AttemptsList
          test={test}
          attempts={test.test_data.attempts_data}
          attemptsAmount={test.test_data.attempts}
          maxScore={test.test_data.score}
        />
      }
      trigger="click"
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <button className={styles.attemptsBtn}>
        <span>Attempts</span>
        <ListIcon />
      </button>
    </Popover>
  );
};

export default SubmitTest;
