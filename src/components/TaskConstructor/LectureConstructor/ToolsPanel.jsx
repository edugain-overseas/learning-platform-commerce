import React, { useState } from "react";
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
import CommonButton from "../../shared/CommonButton/CommonButton";
import Modal from "../../shared/Modal/Modal";
import DocumentToTaskParser from "../../DocumentToTaskContructor/DocumentToTaskParser";
import styles from "./LectureConstructor.module.scss";
import { useLectureConstructor } from "../../../context/LectureConstructorContext";

const ImportDoc = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <CommonButton
        text="Import document"
        onClick={() => setIsOpenModal(true)}
        wrapperStyles={{ width: "100%", marginBottom: "16rem" }}
      />
      <Modal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        height="96vh"
        width="96vw"
      >
        <DocumentToTaskParser closeModal={() => setIsOpenModal(false)} />
      </Modal>
    </div>
  );
};

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

const ToolsPanel = ({ handleSaveLectureParts }) => {
  const isLoading = useSelector(getIsLoading);
  const { handleAddBlock, handleDeleteBlock, blocks } = useLectureConstructor();

  const handleClearLecture = () => {
    blocks.forEach((block) => handleDeleteBlock(block.id));
  };

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
      <div>
        <ImportDoc />
        <CommonButton
          text="Clear lecture"
          variant="grey"
          hoverVariant="red"
          wrapperStyles={{ width: "100%", marginBottom: "16rem" }}
          onClick={handleClearLecture}
        />
        <SaveBtn isLoading={isLoading} handleClick={handleSaveLectureParts} />
      </div>
    </div>
  );
};

export default ToolsPanel;
