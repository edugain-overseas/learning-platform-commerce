import React from "react";
import DeleteBtn from "./DeleteBtn";
import styles from "./FileUploader.module.scss";

const UploadedAudio = ({ src, onDelete }) => {
  return (
    <div className={styles.uploadedFileWrapper}>
      <audio src={src} controls={true}></audio>
      <DeleteBtn onDelete={onDelete} />
    </div>
  );
};

export default UploadedAudio;
