import React from "react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as UploadIcon } from "../../../../images/icons/uploadBig.svg";
import styles from "./ImageUploader.module.scss";

const DropZone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <div {...getRootProps({ className: styles.dropzone })}>
      <input {...getInputProps()} />
      <div className={styles.labelWrapper}>
        <UploadIcon className={styles.uploadIcon} />
        <p>Click or drag file to this area to upload</p>
      </div>
    </div>
  );
};

export default DropZone;
