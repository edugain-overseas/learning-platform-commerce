import React from "react";
import { ReactComponent as NoteIcon } from "../../images/icons/note.svg";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
import styles from "./TasksHeader.module.scss";
import LectureAudioPlayer from "../LectureAudioPlayer/LectureAudioPlayer";

const LectureHeader = ({ lecture }) => {
  const {
    title,
    type,
    number,
    lecture_info: lectureInfo,
    course_id: courseId,
  } = lecture;

  const lectureSpeech = lectureInfo?.lecture_speeches;

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
        {lectureSpeech && lectureSpeech?.length !== 0 && (
          <LectureAudioPlayer lectureSpeeches={lectureInfo.lecture_speeches} />
        )}
        <div className={styles.navBtnsWrapper}>
          <LessonNavigateBtn
            forward={false}
            currentNumber={number}
            courseId={courseId}
          />
          <LessonNavigateBtn
            forward={true}
            currentNumber={number}
            courseId={courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default LectureHeader;
