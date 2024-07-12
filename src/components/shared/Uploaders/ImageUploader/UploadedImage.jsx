import React from "react";
import {ReactComponent as DeleteIcon} from '../../../../images/icons/delete.svg'
import styles from "./ImageUploader.module.scss";

const UploadedImage = ({ src, onDelete }) => (
  <div className={styles.uploadedImage}>
    <img src={src} alt="course poster" />
    <button type="button" onClick={onDelete} className={styles.deleteButton}>
      <DeleteIcon className={styles.deleteIcon}/>
    </button>
  </div>
);

export default UploadedImage;
