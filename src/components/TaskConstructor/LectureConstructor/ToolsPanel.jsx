import React, { useRef, useState } from "react";
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
import CommonButton from "../../shared/CommonButton/CommonButton";
import Modal from "../../shared/Modal/Modal";
import Spinner from "../../Spinner/Spinner";

const ImportDoc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const contentWrapperRef = useRef();

  const cleanDocument = (doc) => {
    const allElems = doc.body.querySelectorAll("*");

    const allowedAttrs = ["href", "src", "alt"];
    //clean useless attributes
    allElems.forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (!allowedAttrs.includes(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });
    });

    // clean useless spans
    doc.querySelectorAll("span").forEach((el) => {
      if (el.querySelector("img")) {
        return;
      }
      el.replaceWith(...el.childNodes);
    });
    //clean empty p tags
    // doc.querySelectorAll("p").forEach((el) => {
    //   if (!el.textContent?.trim()) {
    //     el.remove();
    //   }
    // });

    return doc;
  };

  const handleImportDocument = async () => {
    const DOC_ID = "1bXkgVZ_kZyAxdnq0rWq8Z8SZgk3UhfAXYn_P6eIcoqI";
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://docs.google.com/document/d/${DOC_ID}/export?format=html`
      );

      const html = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const cleanDoc = cleanDocument(doc);
      const content = cleanDoc.body.innerHTML;

      if (content) {
        contentWrapperRef.current.innerHTML = content;
        setIsOpenModal(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <CommonButton
        text="Import document"
        icon={isLoading ? <Spinner /> : null}
        onClick={handleImportDocument}
        wrapperStyles={{ width: "100%", marginBottom: "16rem" }}
      />
      <Modal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        height="90vh"
        width="90vw"
      >
        <div
          ref={contentWrapperRef}
          style={{ overflow: "auto", height: "100%", padding: '16rem', marginTop: '16rem' }}
        />
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
      <div>
        <ImportDoc />
        <SaveBtn isLoading={isLoading} handleClick={handleSaveLectureParts} />
      </div>
    </div>
  );
};

export default ToolsPanel;
