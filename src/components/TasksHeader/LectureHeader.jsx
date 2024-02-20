import React from "react";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as NoteIcon } from "../../images/icons/note.svg";
import TextReader from "../TextReader/TextReader";
import styles from "./TasksHeader.module.scss";

const LectureHeader = ({ lecture }) => {
  const { title, type } = lecture;

  const lectureToSpeech = lecture.content.map(
    ({ a_title: title, a_text: text }) => title + ". " + text
  ).join('. ');

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
        <TextReader textToRead={lectureToSpeech} />
        <div className={styles.navBtnsWrapper}>
          <button className={styles.prev}>
            <ArrowDownIcon />
            <span>Return</span>
          </button>
          <button className={styles.next}>
            <span>Next</span>
            <ArrowDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureHeader;
