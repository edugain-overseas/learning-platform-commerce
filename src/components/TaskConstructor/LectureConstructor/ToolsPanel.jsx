import React from "react";
import { useSelector } from "react-redux";
import { getIsLoading } from "../../../redux/lesson/selectors";
import { lectureParts } from "../../../costants/tasksParts";
import { generateId } from "../../../utils/generateIdBasedOnTime";
import { ReactComponent as TextIcon } from "../../../images/icons/lessonIcons/lecture/text.svg";
import { ReactComponent as PresentIcon } from "../../../images/icons/lessonIcons/lecture/present.svg";
import { ReactComponent as AudioIcon } from "../../../images/icons/lessonIcons/lecture/audio.svg";
import { ReactComponent as VideoIcon } from "../../../images/icons/lessonIcons/lecture/video.svg";
import { ReactComponent as PictureIcon } from "../../../images/icons/lessonIcons/lecture/picture.svg";
import { ReactComponent as FileIcon } from "../../../images/icons/lessonIcons/lecture/file.svg";
import { ReactComponent as LinkIcon } from "../../../images/icons/lessonIcons/lecture/link.svg";
import { ReactComponent as TableIcon } from "../../../images/icons/lessonIcons/lecture/table.svg";
import SaveBtn from "../../shared/SaveBtn/SaveBtn";
import styles from "./LectureConstructor.module.scss";

const toolIcons = {
  text: <TextIcon />,
  present: <PresentIcon />,
  audio: <AudioIcon />,
  video: <VideoIcon />,
  picture: <PictureIcon />,
  file: <FileIcon />,
  link: <LinkIcon />,
  table: <TableIcon />,
};

const ToolsPanel = ({ handleAddBlock, handleSaveLectureParts }) => {
  const isLoading = useSelector(getIsLoading);
  return (
    <div className={styles.toolsWrapper}>
      <ul className={styles.addBlockBtns}>
        {lectureParts.map((part) => (
          <li key={`${part.a_type}.${generateId()}`}>
            <button onClick={() => handleAddBlock(part)} title={part.a_type}>
              <span>{part.a_type}</span>
              {toolIcons[part.a_type]}
            </button>
          </li>
        ))}
      </ul>

      <SaveBtn isLoading={isLoading} handleClick={handleSaveLectureParts} />
    </div>
  );
};

export default ToolsPanel;
