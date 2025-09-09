import React from "react";
import DeleteBtn from "./DeleteBtn";
import VideoPlayer from "../../VideoPlayer/VideoPlayer";
import styles from "./FileUploader.module.scss";

const UploadedVideo = ({ src, onDelete }) => {
  return (
    <div className={`${styles.uploadedFileWrapper} ${styles.uploadedMediaWrapper}`}>
      <VideoPlayer file={{filePath: src}}/>
      <DeleteBtn onDelete={onDelete} />
    </div>
  );
};

export default UploadedVideo;
