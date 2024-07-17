import React from "react";
import DeleteBtn from "./DeleteBtn";
import styles from "./FileUploader.module.scss";

const UploadedImage = ({ src, onDelete }) => (
  <div className={styles.uploadedFileWrapper}>
    <img src={src} alt="uploaded" />
    <DeleteBtn onDelete={onDelete} />
  </div>
);

export default UploadedImage;
