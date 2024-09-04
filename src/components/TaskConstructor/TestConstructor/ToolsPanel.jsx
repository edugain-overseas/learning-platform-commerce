import React, { useState } from "react";
import { InputNumber } from "antd";
import { testParts } from "../../../costants/tasksParts";
import { ReactComponent as EditIcon } from "../../../images/icons/editBlack.svg";
import { ReactComponent as SaveIcon } from "../../../images/icons/save.svg";
import styles from "./TestConstructor.module.scss";
import SaveBtn from "../../shared/SaveBtn/SaveBtn";

const ToolsPanel = ({
  handleAddBlock,
  attempts: defaultAttempts,
  score: defaultScore,
  timer: defaultTimer,
  changeTestMetaData,
  blocksScore,
  handleSaveTestParts,
  isLoading,
}) => {
  const [attemptsDisabled, setAttemptsDisabled] = useState(true);
  const [scoreDisabled, setScoreDisabled] = useState(true);
  const [timerDisabled, setTimerDisabled] = useState(true);
  const [attempts, setAttempts] = useState(defaultAttempts || 10);
  const [score, setScore] = useState(defaultScore || 120);
  const [timer, setTimer] = useState(defaultTimer || 40);

  const handleAttemptsChange = () => {
    if (!attemptsDisabled) {
      if (attempts !== defaultAttempts) {
        changeTestMetaData({ attempts }).then(() => setAttemptsDisabled(true));
      } else {
        setAttemptsDisabled(true);
      }
    } else {
      setAttemptsDisabled(false);
    }
  };

  const handleScoreChange = () => {
    if (!scoreDisabled) {
      if (score !== defaultScore) {
        changeTestMetaData({ score }).then(() => {
          if (blocksScore === score) {
            setScoreDisabled(true);
          }
        });
      } else {
        setScoreDisabled(true);
      }
    } else {
      setScoreDisabled(false);
    }
  };

  const handleTimerChange = () => {
    if (!timerDisabled) {
      if (timer !== defaultTimer) {
        changeTestMetaData({ timer }).then(() => setTimerDisabled(true));
      } else {
        setTimerDisabled(true);
      }
    } else {
      setTimerDisabled(false);
    }
  };

  return (
    <div className={styles.toolsWrapper}>
      <div className={styles.attemptsWrapper}>
        <InputNumber
          min={1}
          value={attempts}
          onChange={(value) => setAttempts(value)}
          addonBefore="Attempts:"
          disabled={attemptsDisabled}
          className={styles.toolsInputNumber}
        />
        <button
          className={styles.changeValueBtn}
          onClick={handleAttemptsChange}
          title={attemptsDisabled ? "change attempts" : "save changes"}
        >
          {attemptsDisabled ? <EditIcon /> : <SaveIcon />}
        </button>
      </div>
      <div className={styles.attemptsWrapper}>
        <InputNumber
          min={1}
          value={score}
          onChange={(value) => setScore(value)}
          addonBefore="Score:"
          disabled={scoreDisabled}
          className={styles.toolsInputNumber}
          status={blocksScore !== score ? "error" : null}
        />
        <button
          className={styles.changeValueBtn}
          onClick={handleScoreChange}
          title={scoreDisabled ? "change score" : "save changes"}
        >
          {scoreDisabled ? <EditIcon /> : <SaveIcon />}
        </button>
      </div>
      <div className={styles.attemptsWrapper}>
        <InputNumber
          min={1}
          value={timer}
          onChange={(value) => setTimer(value)}
          addonBefore="Timer:"
          disabled={timerDisabled}
          className={styles.toolsInputNumber}
        />
        <button
          className={styles.changeValueBtn}
          onClick={handleTimerChange}
          title={timerDisabled ? "change timer" : "save changes"}
        >
          {timerDisabled ? <EditIcon /> : <SaveIcon />}
        </button>
      </div>
      <ul className={styles.addBlockBtns}>
        {testParts.map((part) => (
          <li key={`${part.q_type}`}>
            <button onClick={() => handleAddBlock(part)}>{part.label}</button>
          </li>
        ))}
      </ul>
      <SaveBtn handleClick={handleSaveTestParts} isLoading={isLoading} />
    </div>
  );
};

export default ToolsPanel;