import React from "react";
import { franc } from "franc";
import { ReactComponent as NoteIcon } from "../../images/icons/note.svg";
import TextReader from "../TextReader/TextReader";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import styles from "./TasksHeader.module.scss";

const LectureHeader = ({ lecture }) => {
  const { title, type, number } = lecture;

  const lectureToSpeech = [...lecture.content]
    .sort((itemA, itemB) => itemA.a_number - itemB.a_number)
    .map(({ a_title: title, a_text: text }) => title + ". " + text)
    .join(". ");

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.divider}>|</span>
        <span className={styles.type}>{type}</span>
      </div>
      <div className={styles.toolsWrapper}>
        <div className={styles.note}>
          <span>The note:</span>
          <NoteIcon />
        </div>
        <TextReader
          textToRead={lectureToSpeech}
          lang={franc(lectureToSpeech)}
        />
        <div className={styles.navBtnsWrapper}>
          <LessonNavigateBtn forward={false} currentNumber={number} />
          <LessonNavigateBtn forward={true} currentNumber={number} />
        </div>
      </div>
    </div>
  );
};

export default LectureHeader;
