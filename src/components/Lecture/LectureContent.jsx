import React from "react";
import styles from "./Lecture.module.scss";

const LectureContent = ({ lecture }) => {
  console.log(lecture);
  return <div className={styles.contentWrapper}>LectureContent</div>;
};

export default LectureContent;
