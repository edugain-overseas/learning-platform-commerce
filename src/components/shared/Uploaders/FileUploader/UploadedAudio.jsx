import React from "react";
import DeleteBtn from "./DeleteBtn";
import styles from "./FileUploader.module.scss";
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

const UploadedAudio = ({ src, onDelete }) => {
  return (
    <div
      className={`${styles.uploadedFileWrapper} ${styles.uploadedMediaWrapper} ${styles.uploadedAudioContainer}`}
    >
      <div style={{ flexGrow: 1 }}>{src && <AudioPlayer src={src} />}</div>
      <DeleteBtn onDelete={onDelete} />
    </div>
  );
};

export default UploadedAudio;
