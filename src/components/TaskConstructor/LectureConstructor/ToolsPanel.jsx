import React from "react";
import { useSelector } from "react-redux";
import { getIsLoading } from "../../../redux/lesson/selectors";
import { lectureParts } from "../../../costants/tasksParts";
import { generateId } from "../../../utils/generateIdBasedOnTime";
import SaveBtn from "../../shared/SaveBtn/SaveBtn";
import styles from "./LectureConstructor.module.scss";

const ToolsPanel = ({ handleAddBlock, handleSaveLectureParts }) => {
  const isLoading = useSelector(getIsLoading);
  return (
    <div className={styles.toolsWrapper}>
      <ul className={styles.addBlockBtns}>
        {lectureParts.map((part) => (
          <li key={`${part.a_type}.${generateId()}`}>
            <button onClick={() => handleAddBlock(part)}>{part.a_type}</button>
          </li>
        ))}
      </ul>

      <SaveBtn isLoading={isLoading} handleClick={handleSaveLectureParts} />
    </div>
  );
};

export default ToolsPanel;
