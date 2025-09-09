import React from "react";
import DeleteBtn from "./DeleteBtn";
import styles from "./FileUploader.module.scss";

const UploadedAudio = ({ src, onDelete }) => {
  return (
    <div className={`${styles.uploadedFileWrapper} ${styles.uploadedMediaWrapper} ${styles.uploadedAudioContainer}`}>
      <audio src={src} controls={true}></audio>
      <DeleteBtn onDelete={onDelete} />
    </div>
  );
};

export default UploadedAudio;
