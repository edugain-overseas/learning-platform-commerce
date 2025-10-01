import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllLessons } from "../../../redux/lesson/selectors";
import { InputNumber } from "antd";
import { testParts } from "../../../costants/tasksParts";
import { ReactComponent as EditIcon } from "../../../images/icons/editBlack.svg";
import { ReactComponent as SaveIcon } from "../../../images/icons/save.svg";
import SaveBtn from "../../shared/SaveBtn/SaveBtn";
import styles from "./TestConstructor.module.scss";

const ToolsPanel = ({
  handleAddBlock,
  timer: defaultTimer,
  changeTestMetaData,
  handleSaveTestParts,
  isLoading,
}) => {
  const { taskId } = useParams();
  const task = useSelector(getAllLessons).find(
    (lesson) => lesson.id === +taskId
  );

  const [timerDisabled, setTimerDisabled] = useState(true);
  const [timer, setTimer] = useState(defaultTimer || task?.scheduled_time);

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
      <div>
        <div className={styles.attemptsWrapper}>
          <InputNumber
            min={1}
            value={timer}
            onChange={(value) => setTimer(value)}
            addonBefore="Timer:"
            disabled={timerDisabled || task.type === "exam"}
            className={styles.toolsInputNumber}
          />
          {task.type !== "exam" && (
            <button
              className={styles.changeValueBtn}
              onClick={handleTimerChange}
              title={timerDisabled ? "change timer" : "save changes"}
            >
              {timerDisabled ? <EditIcon /> : <SaveIcon />}
            </button>
          )}
        </div>
        <ul className={styles.addBlockBtns}>
          {testParts.map((part) => (
            <li key={`${part.q_type}`}>
              <button onClick={() => handleAddBlock(part)}>
                <span>{part.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <SaveBtn handleClick={handleSaveTestParts} isLoading={isLoading} />
    </div>
  );
};

export default ToolsPanel;
