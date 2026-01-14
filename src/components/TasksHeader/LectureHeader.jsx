import React from "react";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/selectors";
import LessonNavigateBtn from "../shared/LessonNavigateBtn/LessonNavigateBtn";
// import LectureAudioPlayer from "../LectureAudioPlayer/LectureAudioPlayer";
// import Notes from "../Notes/Notes";
import Switcher from "../shared/Switcher/Switcher";
import Template from "../shared/Template/Template";
import styles from "./TasksHeader.module.scss";

const LectureHeader = ({
  lecture,
  switcherItems,
  switcherValue,
  switcherOnChange,
}) => {
  const {
    title,
    type,
    number,
    // lecture_info: lectureInfo,
    course_id: courseId,
  } = lecture;

  // const lectureSpeech = lectureInfo?.lecture_speeches;

  const isModer = useSelector(getUserType) === "moder";

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.divider}>|</span>
        <span className={styles.type}>{type}</span>
      </div>

      <div className={styles.toolsWrapper}>
        {isModer ? (
          <>
            <Template type="lecture" />
            <Switcher
              items={switcherItems}
              value={switcherValue}
              onChange={switcherOnChange}
            />
          </>
        ) : (
          // <Notes />
          null
        )}
        {/* {lectureSpeech && lectureSpeech?.length !== 0 && !isModer && (
          <LectureAudioPlayer lectureSpeeches={lectureInfo.lecture_speeches} />
        )} */}
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
