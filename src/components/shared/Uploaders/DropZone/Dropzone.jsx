import React from "react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as UploadIcon } from "../../../../images/icons/uploadBig.svg";
import styles from "./DropZone.module.scss";

const DropZone = ({ onDrop, accept, className = "" }) => {
  const acceptDropzoneProp = { [accept]: [] };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept && acceptDropzoneProp,
    multiple: false,
  });

  const fileType = accept.split("/")[0] === "*" ? "file" : accept.split("/")[0];

  console.log(getInputProps());

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} accept={accept} />
      <div className={styles.labelWrapper}>
        <UploadIcon className={styles.uploadIcon} />
        <p>{`Click or drag ${fileType} to this area to upload`}</p>
      </div>
    </div>
  );
};

export default DropZone;
