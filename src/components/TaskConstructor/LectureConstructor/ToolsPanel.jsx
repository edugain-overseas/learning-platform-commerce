import React from "react";
import { useSelector } from "react-redux";
import { getIsLoading } from "../../../redux/lesson/selectors";
import { lectureParts } from "../../../costants/tasksParts";
import { generateId } from "../../../utils/generateIdBasedOnTime";
// import { ReactComponent as SaveIcon } from "../../../images/icons/save.svg";
// import Spinner from "../../Spinner/Spinner";
import styles from "./LectureConstructor.module.scss";
import SaveBtn from "../../shared/SaveBtn/SaveBtn";

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
